require('dotenv').config();

const { Client } = require('pg');

const client = new Client({
  host: process.env.DB_HOST,
  port: process.env.DB_PORT,
  user: process.env.DB_USER,
  password: process.env.DB_PASSWORD,
  database: process.env.DB_NAME,
  ssl: {
    rejectUnauthorized: false
  }
});

async function initDatabase() {
  await client.connect();

  const res = await client.query(
    'SELECT current_database();'
  );

  console.log(
    'Connesso al database:',
    res.rows[0].current_database
  );


}

module.exports = {
  client,
  initDatabase
};

