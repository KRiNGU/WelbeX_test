import pg from 'pg';
import dotenv from 'dotenv';
dotenv.config();

// Создаём объект общения с базой данных. Данные берём из .env, который заносим в .gitignore
const pool = new pg.Pool({
  user: process.env.DB_USERNAME,
  password: process.env.DB_PASSWORD,
  host: 'localhost',
  port: 5432,
  database: process.env.DB_NAME,
});

export default pool;
