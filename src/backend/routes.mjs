import http from 'http';
import Controller from './controller.mjs';

const host = 'localhost';
const port = 8000;

const controller = new Controller();

const requestListener = async (req, res) => {
  const headers = {
    'Access-Control-Allow-Origin': '*',
    'Access-Control-Allow-Methods': 'OPTIONS, POST, GET',
    'Access-Control-Max-Age': 2592000, // 30 days
  };
  res.setHeader('Content-Type', 'application/json');

  if (req.url === '/api/elements') {
    if (req.method === 'OPTIONS') {
      res.writeHead(204, headers, {
        'Access-Control-Allow-Headers': 'Content-Type, Authorization',
      });
      res.end();
      return;
    }
    if (req.method === 'POST') {
      const newTableElement = await controller.createTableElement(req);
      res.writeHead(200, headers);
      res.end(JSON.stringify(newTableElement));
      return;
    } else if (req.method === 'GET') {
      const newTableElements = await controller.getAllTableElement();
      res.writeHead(200, headers);
      res.end(JSON.stringify(newTableElements));
      return;
    }
  }

  if (/\/api\/elements\/\d+/.test(req.url)) {
    if (req.method === 'GET') {
      const getTableElement = await controller.getTableElement(req);
      if (!getTableElement) {
        res.writeHead(404, headers);
        res.end('Not found');
        return;
      }
      res.writeHead(200, headers);
      res.end(JSON.stringify(getTableElement));
      return;
    }
  }

  if (/\/api\/elements?/.test(req.url)) {
    let getTableByPageResult;
    try {
      getTableByPageResult = await controller.getTableElementsByPage(req);
    } catch (e) {
      res.writeHead(400, headers);
      res.end('Bad request');
      return;
    }
    res.writeHead(200, headers);
    res.end(JSON.stringify(getTableByPageResult));
    return;
  }
  res.writeHead(405, headers);
  res.end('Request not found');
};

const server = http.createServer(requestListener);
server.listen(port, host);
