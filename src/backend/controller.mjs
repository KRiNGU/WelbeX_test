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
}

export default Controller;
