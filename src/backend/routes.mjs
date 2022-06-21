import http from 'http';
import Controller from './controller.mjs';

const host = 'localhost';
const port = 8000;

const controller = new Controller();

const requestListener = async (req, res) => {
  res.setHeader('Content-Type', 'application/json');
  if (req.url === '/element') {
    if (req.method === 'POST') {
      const newTableElement = await controller.createTableElement(req);
      res.writeHead(200);
      res.end(JSON.stringify(newTableElement));
      return;
    } else if (req.method === 'GET') {
      const newTableElements = await controller.getAllTableElement();
      res.writeHead(200);
      res.end(JSON.stringify(newTableElements));
      return;
    }
  }
  if (/element\/\d+/.test(req.url)) {
    if (req.method === 'GET') {
      const getTableElement = await controller.getTableElement(req);
      if (!getTableElement) {
        res.writeHead(404);
        res.end('Not found');
        return;
      }
      res.writeHead(200);
      res.end(JSON.stringify(getTableElement));
      return;
    }
  }
  res.writeHead(404);
  res.end('Request not found');
};

const server = http.createServer(requestListener);
server.listen(port, host, () => {
  console.log(`Server is running on http://${host}:${port}`);
});
