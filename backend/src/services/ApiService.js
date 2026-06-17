const { supabase } = require('../../db');

//GET REGIONS
async function getRegions() {
  try {
    const { rows } = await pool.query(`
      SELECT *
      FROM regions
      ORDER BY name
    `);

    res.json(rows);
  } catch (error) {
    console.error(error);
    res.status(500).json({
      success: false,
      message: 'Errore recupero regioni',
    });
  }
}


//GET TAGS
async function getTags() {
  try {
    const { rows } = await pool.query(`
      SELECT *
      FROM tags
    `);

    res.json(rows);
  } catch (error) {
    console.error(error);
    res.status(500).json({
      success: false,
      message: 'Errore recupero tag',
    });
  }
}

//GET TAGS BY REGION_ID
async function getTagByRegion(regionId) {
  try {
    const { rows } = await pool.query(
      `
      SELECT *
      FROM tags
      WHERE region_id = $1
  `,
      [regionId],
    );

    res.json(rows);
  } catch (error) {
    console.error(error);
    res.status(500).json({
      success: false,
      message: 'Errore recupero tag',
    });
  }
}

//GET TAGS BY REGION_ID AND TAG_ID
async function getTagByRegionAndTag(regionId) {
  try {
    const { rows } = await pool.query(
      `
      SELECT *
      FROM tags
      WHERE region_id = $1
  `,
      [regionId],
    );

    res.json(rows);
  } catch (error) {
    console.error(error);
    res.status(500).json({
      success: false,
      message: 'Errore recupero tag',
    });
  }
}

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
  getTagByRegion,
  getSubTags,
  createContent,
};
