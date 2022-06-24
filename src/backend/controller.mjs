import db from './db.mjs';

class Controller {
  async createTableElement(req) {
    let body = '';
    await req.on('readable', () => {
      body += req.read();
    });
    await req.on('end', () => {
      body = body.slice(0, body.length - 4);
    });
    const { name, date, number, distance } = JSON.parse(body);
    const newTableElement = await db.query(
      `INSERT INTO table_element (name, date, number, distance) values ($1, $2, $3, $4) RETURNING *`,
      [name, date, number, distance]
    );
    return newTableElement.rows[0];
  }

  async getTableElement(req) {
    const id = req.url.split('/').pop();
    const getTableElement = await db.query(
      `SELECT * FROM table_element WHERE id = $1`,
      [id]
    );
    return getTableElement.rows[0];
  }

  async getAllTableElement() {
    const getTableElements = await db.query(`SELECT * FROM table_element`);
    return getTableElements.rows;
  }

  async getTableElementsByPage(req) {
    const url = req.url.split('/');
    const lastUrlElement = url[url.length - 1];
    const pageResult = lastUrlElement.match(/page=[0-9]+/);
    const limitResult = lastUrlElement.match(/limit=[0-9]+/);
    const filterFieldResult = lastUrlElement.match(/filter=[a-zA-Z0-9]+/);
    const filterActionResult = lastUrlElement.match(/action=[a-zA-Z0-9]+/);
    const filterValueResult = lastUrlElement.search(/value=/);
    if (pageResult === null || limitResult === null) {
      throw new Error('Page or result is null');
    }
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
    let getTableDBAnswer;
    let getTableEmenentCountDBAnswer;

    if (filterField && filterAction && filterValue) {
      switch (filterAction) {
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

        default:
          throw new Error('Unknown filter ation type ', filterAction);
      }
    } else {
      getTableDBAnswer = await db.query(
        `SELECT * FROM table_element LIMIT ${limit} OFFSET ${page * limit};`
      );
      getTableEmenentCountDBAnswer = await db.query(
        `SELECT count(*) FROM table_element`
      );
    }
    const tableElementNumber = parseInt(
      getTableEmenentCountDBAnswer.rows[0].count
    );
    const pageCount =
      (tableElementNumber - (tableElementNumber % limit)) / limit +
      (tableElementNumber % limit === 0 ? 0 : 1);
    return { table: getTableDBAnswer.rows, pages: pageCount };
  }
}

export default Controller;
