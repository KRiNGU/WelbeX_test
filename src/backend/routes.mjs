import http from 'http';
import Controller from './controller.mjs';

const host = 'localhost';
const port = 8000;

const controller = new Controller();

const requestListener = async (req, res) => {
  // Записываем стандартные заголовки CORS
  const headers = {
    'Access-Control-Allow-Origin': '*',
    'Access-Control-Allow-Methods': 'OPTIONS, POST, GET',
    'Access-Control-Max-Age': 2592000, // 30 days
  };
  res.setHeader('Content-Type', 'application/json');

  // Если url - это только api/elements, то мы хотим либо получить все данные по таблице, либо создать новую запись
  if (req.url === '/api/elements') {
    // Если запрос OPTIONS, то разрешаем клиенту отправить нам данные
    if (req.method === 'OPTIONS') {
      res.writeHead(204, headers, {
        'Access-Control-Allow-Headers': 'Content-Type, Authorization',
      });
      res.end();
      return;
    }
    // Если POST, то создаём и отправляем данные
    if (req.method === 'POST') {
      const newTableElement = await controller.createTableElement(req);
      res.writeHead(200, headers);
      res.end(JSON.stringify(newTableElement));
      return;
    }
    // Если GET, то отправляем все данные по таблице
    if (req.method === 'GET') {
      const newTableElements = await controller.getAllTableElement();
      res.writeHead(200, headers);
      res.end(JSON.stringify(newTableElements));
      return;
    }
  }

  // Если мы после api/elements видим '?', то мы включаем пагинацию
  if (/\/api\/elements?/.test(req.url)) {
    let getTableByPageResult;
    try {
      getTableByPageResult = await controller.getTableElementsByPage(req);
    } catch (e) {
      // Если запрос к базе данных не сработал, то нам был прислан некорректный запрос с клиента. Сообщаем ему об этом
      res.writeHead(400, headers);
      res.end('Bad request');
      return;
    }
    res.writeHead(200, headers);
    res.end(JSON.stringify(getTableByPageResult));
    return;
  }

  // Если ни один из вариантов запроса не отработал, то кидаем 405
  res.writeHead(405, headers);
  res.end('Request not found');
};

const server = http.createServer(requestListener);
server.listen(port, host);
