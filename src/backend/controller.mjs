import db from './db.mjs';

// Класс общения с БД
class Controller {
  async createTableElement(req) {
    let body = '';
    // Считываем данные из request, пока не встретим end
    await req.on('readable', () => {
      body += req.read();
    });
    await req.on('end', () => {
      // Отсекаем null, который по умолчанию ставится к конце
      body = body.slice(0, body.length - 4);
    });
    // Вытягиваем интересующие нас данные из преобразованного JSON
    const { name, date, number, distance } = JSON.parse(body);
    const newTableElement = await db.query(
      `INSERT INTO table_element (name, date, number, distance) values ($1, $2, $3, $4) RETURNING *`,
      [name, date, number, distance]
    );
    // Отсылаем обратно только что созданные объект
    return newTableElement.rows[0];
  }

  async getAllTableElement() {
    const getTableElements = await db.query(`SELECT * FROM table_element`);
    return getTableElements.rows;
  }

  // Получение запроса по странице
  async getTableElementsByPage(req) {
    // Разбиваем url, чтобы удобно работать с последней частью
    const url = req.url.split('/');
    const lastUrlElement = url[url.length - 1];
    // Получаем все интересующие нас частности запроса
    const pageResult = lastUrlElement.match(/page=[0-9]+/);
    const limitResult = lastUrlElement.match(/limit=[0-9]+/);
    const filterFieldResult = lastUrlElement.match(/filter=[a-zA-Z0-9]+/);
    const filterActionResult = lastUrlElement.match(/action=[a-zA-Z0-9]+/);
    const filterValueResult = lastUrlElement.search(/value=/);
    if (pageResult === null || limitResult === null) {
      throw new Error('Page or result is null');
    }
    // От результатов регулярок отсекаем ненужную нам текстовую часть
    const page = pageResult[0].substring(5);
    const limit = limitResult[0].substring(6);
    const filterField = filterFieldResult
      ? filterFieldResult[0].substring(7)
      : '';
    const filterAction = filterActionResult
      ? filterActionResult[0].substring(7)
      : '';
    const filterValue =
      filterValueResult !== -1
        ? lastUrlElement.substring(filterValueResult + 6)
        : '';

    // Инициализируем два ответа с базы данных, чтобы в if условии проставить их
    let getTableDBAnswer;
    let getTableEmenentCountDBAnswer;

    // Если с клиента пришли корректные данные по полю, методу фильтрации и значению, обрабатываем
    if (filterField && filterAction && filterValue) {
      // Так как fitlerField эквивалентен полю в БД, нас интересует только filterAction
      switch (filterAction) {
        // Если "Равно"
        case 'eq':
          getTableDBAnswer = await db.query(
            `SELECT * FROM table_element WHERE ${filterField} = '${filterValue}' LIMIT ${limit} OFFSET ${
              page * limit
            };`
          );
          getTableEmenentCountDBAnswer = await db.query(
            `SELECT count(*) FROM table_element WHERE ${filterField} = '${filterValue}'`
          );
          break;
        // Если "Включает"
        case 'inc':
          getTableDBAnswer = await db.query(
            `SELECT * FROM table_element WHERE ${filterField} LIKE '%${filterValue}%' LIMIT ${limit} OFFSET ${
              page * limit
            };`
          );
          getTableEmenentCountDBAnswer = await db.query(
            `SELECT count(*) FROM table_element WHERE ${filterField} LIKE '${filterValue}'`
          );
          break;
        // Если "Меньше"
        case 'lt':
          getTableDBAnswer = await db.query(
            `SELECT * FROM table_element WHERE ${filterField} < '${filterValue}' LIMIT ${limit} OFFSET ${
              page * limit
            };`
          );
          getTableEmenentCountDBAnswer = await db.query(
            `SELECT count(*) FROM table_element WHERE ${filterField} < '${filterValue}'`
          );
          break;
        // Если "Больше>"
        case 'gt':
          getTableDBAnswer = await db.query(
            `SELECT * FROM table_element WHERE ${filterField} > '${filterValue}' LIMIT ${limit} OFFSET ${
              page * limit
            };`
          );
          getTableEmenentCountDBAnswer = await db.query(
            `SELECT count(*) FROM table_element WHERE ${filterField} > '${filterValue}'`
          );
          break;
        // Если ни один из вариантов не подошёл, то некорректный запрос, кидаем ошибку, которая потом вылетит в Bad Request клиенту
        default:
          throw new Error('Unknown filter ation type ', filterAction);
      }
      // Если хотя бы одно из полей фильтрации не заполнено, то ищем нефильтрованные значения
    } else {
      getTableDBAnswer = await db.query(
        `SELECT * FROM table_element LIMIT ${limit} OFFSET ${page * limit};`
      );
      getTableEmenentCountDBAnswer = await db.query(
        `SELECT count(*) FROM table_element`
      );
    }
    // Вытягиваем из количественного запроса к БД нужное нам поле с ответом
    const tableElementNumber = parseInt(
      getTableEmenentCountDBAnswer.rows[0].count
    );
    // Получаем число страниц делением нацело.
    // Дополнительное условие на "+" нужно нам, чтобы не потерять страницу при целочисленом делении
    const pageCount =
      (tableElementNumber - (tableElementNumber % limit)) / limit +
      (tableElementNumber % limit === 0 ? 0 : 1);
    return { table: getTableDBAnswer.rows, pages: pageCount };
  }
}

export default Controller;
