import pg from 'pg';
import dotenv from 'dotenv';
dotenv.config();

const pool = new pg.Pool({
  user: process.env.DB_USERNAME,
  password: process.env.DB_PASSWORD,
  host: 'localhost',
  port: 5432,
  database: 'welbeX',
});

export default pool;
