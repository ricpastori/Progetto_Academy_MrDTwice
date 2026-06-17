
const express = require(`express`);

const router = express.Router();

const apiService = require('../services/ApiService');



//GET REGION
router.get(`/api/regions`, async (req, res) => {
  try {
    const regions = apiService.getRegions();

    res.status(200).json(regions);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

//GET TAGS
router.get(`/api/tags`, async (req, res) => {
  try {
    const tags = apiService.getTags();

    res.status(200).json(tags);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

//GET CONTENT 
router.get("/api/content", async (req, res) => {
  try {
    let content;

    const { regionId, tagId } = req.query;

    if (regionId && tagId) {
      content = await apiService.getContentByRegionAndTag(regionId, tagId);
    } 
    else if (regionId) {
      content = await apiService.getContentByRegion(regionId);
    } 
    else {
      content = await apiService.getContent();
    }

    if (!content || content.length === 0) {
      return res.status(404).json({ error: "Not found" });
    }

    res.status(200).json(content);

  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});



//GET SUB_TAGS



//POST CONTENT
router.post(`/api/content`, async (req, res) => {
  try {
   await 
    apiService.createContent(req.body);

    res.status(201).json(apiService);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

module.exports = router;
