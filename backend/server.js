const express = require('express');
const cors = require('cors');
const db = require('./db');
const apiService = require('./src/services/ApiService');

const app = express();
const port = 8080;

app.use(cors());
app.use(express.json());

async function startServer() {
  try {
    await db.initDatabase();

    // let x = await apiService.getContentByTagOrderByRegion();
    // console.log(x);

    console.log(' Connessione a Supabase riuscita');

    app.listen(port, () => {
      console.log(`Server avviato su http://localhost:${port}`);
    });

  } catch (error) {
    console.error('Errore connessione Supabase:', error.message);
    process.exit(1);
  }
}

startServer();
