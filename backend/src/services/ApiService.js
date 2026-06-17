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
    return error;
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
    return error;
  }
}

//GET CONTENT
async function getContent() {
  try {
    const { rows } = await pool.query(`
      SELECT *
      FROM content
    `);

    return rows;
  } catch (error) {
    console.error(error);
    return error;
  }
}

//GET CONTENT BY REGION_ID
async function getContentByRegion(regionId) {
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
    return error;
  }
}

//GET CONTENT BY REGION_ID AND TAG_ID
async function getContentByRegionAndTag(regionId, tagId) {
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
    return error;
  }
}

//GET SUB_TAG
async function getSubTag(tagId) {
  try {
    const { rows } = await pool.query(
      `
      SELECT *
      FROM sub_tags
      WHERE tag_id = $1
  `,
      [tagId],
    );

    return rows;
  } catch (error) {
    console.error(error);
    return error;
  }
}

//IL CONTENT PIU' RECENTE PER REGIONE
async function getContentByTagOrderByRegion(tagId) {
  try {
    const { rows } = await pool.query(
      `
      SELECT DISTINCT ON (region_id)
       region_id, 
       place,
       created_at
        FROM content
        WHERE tag_id = $1 
        ORDER BY region_id, created_at desc;
  `,
      [tagId],
    );

    return rows;
  } catch (error) {
    console.error(error);
    return error;
  }
}

//IL CONTENT PIU' RECENTE PER REGIONE
async function getContentByTagOrderByLikes(tagId) {
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
ORDER BY region_id, likes desc;
  `,
      [tagId],
    );

    return rows;
  } catch (error) {
    console.error(error);
    return error;
  }
}

//I CONTENT CON PIU' LIKE

//POST CONTENT
async function createContent(data) {
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
}

module.exports = {
  getRegions,
  getTags,
  getContent,
  getSubTag,
  getContentByRegion,
  getContentByRegionAndTag,
  getContentByTagOrderByRegion,
  getContentByTagOrderByLikes,
  createContent,
};
