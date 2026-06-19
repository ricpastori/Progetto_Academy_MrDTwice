const { Pool } = require('pg');

const pool = new Pool({
  host: process.env.DB_HOST,
  port: process.env.DB_PORT,
  user: process.env.DB_USER,
  password: process.env.DB_PASSWORD,
  database: process.env.DB_NAME,
  ssl: { rejectUnauthorized: false },
});

//GET REGIONS
async function getRegions() {
  try {
    const { rows } = await pool.query(`
      SELECT *
      FROM regions
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
      FROM regions
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
async function getTags() {
  try {
    const { rows } = await pool.query(`
      SELECT *
      FROM tags
    `);

    return rows;
  } catch (error) {
    console.error(error);
    throw error;
  }
}

//GET CONTENT
async function getContents() {
  try {
    const { rows } = await pool.query(`
      SELECT *
      FROM content
    `);

    return rows;
  } catch (error) {
    console.error(error);
    throw error;
  }
}

//GET CONTENT BY REGION_ID
async function getContentsByRegion(regionId) {
  try {
    const { rows } = await pool.query(
      `
      SELECT *
      FROM content
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

//GET CONTENT BY REGION_ID AND TAG_ID
async function getContentsByRegionAndTag(regionId, tagId) {
  try {
    const { rows } = await pool.query(
      `
      SELECT *
      FROM content
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

//GET SUB_TAG
async function getSubTags() {
  try {
    const { rows } = await pool.query(
      `
      SELECT *
      FROM sub_tags
  `
    );

    return rows;
  } catch (error) {
    console.error(error);
    throw error;
  }
}

//IL CONTENT PIU' RECENTE PER REGIONE
async function getLatestContentByRegionByTag(tagId) {
  try {
    const { rows } = await pool.query(
      `
      SELECT DISTINCT ON (region_id)
       region_id, 
       place,
       created_at
        FROM content
        WHERE tag_id = $1 
        ORDER BY region_id, created_at desc  LIMIT 5;
  `,
      [tagId],
    );

    return rows;
  } catch (error) {
    console.error(error);
    throw error;
  }
}

//IL CONTENT CON PIU' LIKES PER REGIONE
async function getMostLikedContentByRegionByTag(tagId) {
  try {
    const { rows } = await pool.query(
      `
      SELECT DISTINCT ON (region_id)
		likes,
       region_id, 
       place,
       created_at
FROM content
WHERE tag_id = $1 
ORDER BY region_id, likes desc LIMIT 5;
  `,
      [tagId],
    );

    return rows;
  } catch (error) {
    console.error(error);
    throw error;
  }
}

//POST CONTENT
async function createContent(data) {
  try {
    const { region_id, tag_id, sub_tag_id, city, place, description, image_url } = data;

    const result = await pool.query(
      `
      INSERT INTO content
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

//POST LIKE DISLIKE CONTENT
async function addLike(id) {
  try {
    const { rows } = await pool.query(
      `
      UPDATE content
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

async function addDislike(id) {
  try {
    const { rows } = await pool.query(
      `
      UPDATE content
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

module.exports = {
  getRegions,
  getRegionById,
  getTags,
  getContents,
  getSubTags,
  getContentsByRegion,
  getContentsByRegionAndTag,
  getLatestContentByRegionByTag,
  getMostLikedContentByRegionByTag,
  createContent,
  addLike,
  addDislike
};
