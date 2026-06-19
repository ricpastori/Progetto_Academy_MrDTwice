const { Pool } = require('pg');
const { createClient } = require('@supabase/supabase-js');
const { v4: uuidv4 } = require('uuid');

const supabaseUrl = process.env.SUPABASE_URL;
const supabaseKey = process.env.SUPABASE_KEY;
const supabase = createClient(supabaseUrl, supabaseKey);

// Pool di connessioni PostgreSQL usato da tutte le funzioni del service.
// I valori arrivano dalle variabili d'ambiente configurate per il backend.
const pool = new Pool({
  host: process.env.DB_HOST,
  port: process.env.DB_PORT,
  user: process.env.DB_USER,
  password: process.env.DB_PASSWORD,
  database: process.env.DB_NAME,
  ssl: { rejectUnauthorized: false },
});

// Recupera tutte le regioni dal database, ordinate alfabeticamente per nome.
async function getRegions() {
  try {
    const { rows } = await pool.query(`
      SELECT *
      FROM public.regions
      ORDER BY name
    `);

    return rows;
  } catch (error) {
    console.error(error);
    throw error;
  }
}

//GET REGION BY ID
async function getRegionById(id) {
  try {
    const { rows } = await pool.query(
      `
      SELECT *
      FROM public.regions
      WHERE id = $1
  `,
      [id],
    );
    return rows;
  } catch (error) {
    console.error(error);
    throw error;
  }
}

//GET TAGS
// Recupera tutti i tag disponibili per classificare i contenuti.
async function getTags() {
  try {
    const { rows } = await pool.query(`
      SELECT *
      FROM public.tags
    `);

    return rows;
  } catch (error) {
    console.error(error);
    throw error;
  }
}

// Recupera tutti i contenuti senza applicare filtri su regione o tag.
async function getContents() {
  try {
    const { rows } = await pool.query(`
      SELECT *
      FROM public.content
    `);

    return rows;
  } catch (error) {
    console.error(error);
    throw error;
  }
}

// Conta quanti contenuti sono associati a ogni regione.
// Il LEFT JOIN mantiene nel risultato anche le regioni senza contenuti.
async function getContentsCountByRegion() {
  try {
    const { rows } = await pool.query(
      `
      SELECT regions.id,
        COALESCE(COUNT(content.id), 0)::int AS count
      FROM public.regions
      LEFT JOIN public.content ON public.content.region_id = regions.id
      GROUP BY regions.id, regions.name;
      `,
    );

    return rows;
  } catch (error) {
    console.error(error);
    throw error;
  }
}

// Recupera i contenuti appartenenti a una singola regione.
// regionId viene passato come parametro SQL per evitare query costruite a stringa.
async function getContentsByRegion(regionId) {
  try {
    const { rows } = await pool.query(
      `
      SELECT *
      FROM public.content
      WHERE region_id = $1
  `,
      [regionId],
    );

    return rows;
  } catch (error) {
    console.error(error);
    throw error;
  }
}

// Recupera i contenuti filtrando contemporaneamente per regione e tag.
async function getContentsByRegionAndTag(regionId, tagId) {
  try {
    const { rows } = await pool.query(
      `
      SELECT *
      FROM public.content
      WHERE region_id = $1 AND tag_id = $2
  `,
      [regionId, tagId],
    );

    return rows;
  } catch (error) {
    console.error(error);
    throw error;
  }
}

// Recupera tutti i sotto-tag disponibili.
async function getSubTags() {
  try {
    const { rows } = await pool.query(
      `
      SELECT *
      FROM public.sub_tags
  `,
    );

    return rows;
  } catch (error) {
    console.error(error);
    throw error;
  }
}

// Per ogni regione restituisce il contenuto più recente associato al tag indicato.
// DISTINCT ON sceglie una sola riga per region_id dopo l'ordinamento per data.
async function getLatestContentByRegion() {
  try {
    const { rows } = await pool.query(
      `
      SELECT *
FROM (
    SELECT DISTINCT ON (region_id)
        id,
        region_id,
        tag_id,
        sub_tag_id,
        city,
        place,
        image_url,
        description,
        likes,
        dislikes,
        created_at
    FROM public.content
    WHERE tag_id = 1
    ORDER BY region_id, created_at DESC
) AS latest
ORDER BY created_at DESC
LIMIT 5;
      `,
    );

    return rows;
  } catch (error) {
    console.error(error);

    throw error;
  }
}

// Per ogni regione restituisce il contenuto con più like associato al tag indicato.
// DISTINCT ON sceglie una sola riga per region_id dopo l'ordinamento per like.
async function getMostLikedContentByRegion() {
  try {
    const { rows } = await pool.query(
      `
      SELECT DISTINCT ON (region_id)
    id,
    region_id,
    tag_id,
    sub_tag_id,
    city,
    place,
    image_url,
    description,
    likes,
    dislikes,
    created_at
FROM public.content
ORDER BY region_id, likes DESC;

      `,
    );

    return rows;
  } catch (error) {
    console.error(error);

    throw error;
  }
}

// Inserisce un nuovo contenuto nel database e restituisce la riga appena creata.
async function createContent(data) {
  try {
    const { region_id, tag_id, sub_tag_id, city, place, description, image_url } = data;

    const result = await pool.query(
      `
      INSERT INTO public.content
      (
        region_id,
        tag_id,
        sub_tag_id,
        city,
        place,
        description,
        image_url
      )

      VALUES
      ($1,$2,$3,$4,$5,$6,$7)

      RETURNING *
      `,

      [region_id, tag_id, sub_tag_id, city, place, description, image_url],
    );

    return result.rows[0];
  } catch (error) {
    console.error('Errore creazione content:', error);

    throw error;
  }
}

// Incrementa di 1 il numero di like del contenuto indicato.
async function addLike(id) {
  try {
    const { rows } = await pool.query(
      `
      UPDATE public.content
      SET likes = likes + 1
      WHERE id = $1
      RETURNING *
      `,

      [id],
    );

    return rows[0];
  } catch (error) {
    console.error(error);

    throw error;
  }
}

// Incrementa di 1 il numero di dislike del contenuto indicato.
async function addDislike(id) {
  try {
    const { rows } = await pool.query(
      `
      UPDATE public.content
      SET dislikes = dislikes + 1
      WHERE id = $1
      RETURNING *
      `,

      [id],
    );

    return rows[0];
  } catch (error) {
    console.error(error);

    throw error;
  }
}

async function uploadImageToSupabase(file) {
  try {
    const fileExt = file.originalname.split('.').pop();
    const fileName = `${uuidv4()}.${fileExt}`;
    const filePath = `places/${fileName}`;

    const { error } = await supabase.storage.from('mrdtwice-images').upload(filePath, file.buffer, {
      contentType: file.mimetype,
      cacheControl: '3600',
      upsert: false,
    });

    if (error) {
      console.error('Errore storage Supabase:', error.message);
      return null;
    }

    const { data } = supabase.storage.from('mrdtwice-images').getPublicUrl(filePath);

    return data.publicUrl;
  } catch (err) {
    console.error("Eccezione durante l'upload:", err);
    throw err;
  }
}

// Esporta tutte le operazioni usate dalle routes API.
module.exports = {
  getRegions,
  getRegionById,
  getTags,
  getContents,
  getSubTags,
  getContentsByRegion,
  getContentsCountByRegion,
  getContentsByRegionAndTag,
  getLatestContentByRegion,
  getMostLikedContentByRegion,
  createContent,
  addLike,
  addDislike,
  uploadImageToSupabase,
};
