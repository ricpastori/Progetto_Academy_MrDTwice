require('dotenv').config();

const { createClient } = require('@supabase/supabase-js');

const supabaseUrl = process.env.SUPABASE_URL;
const supabaseKey = process.env.SUPABASE_ANON_KEY;

const supabase = createClient(supabaseUrl, supabaseKey);

async function initDatabase() {
  try {
    // Test connessione
    const { error } = await supabase.auth.getSession();

    if (error) {
      throw error;
    }

    console.log('Connessione a Supabase riuscita');
  } catch (err) {
    console.error('Errore di connessione a Supabase:', err.message);
    throw err;
  }
}

module.exports = {
  supabase,
  initDatabase,
};
