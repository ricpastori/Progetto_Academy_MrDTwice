const express = require(`express`);

const router = express.Router();

const apiService = require('../services/ApiService');

//GET REGIONS
router.get(`/api/regions`, async (req, res) => {
  try {
    const regions = await apiService.getRegions();

    res.status(200).json(regions);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

//GET TAGS
router.get(`/api/tags`, async (req, res) => {
  try {
    const tags = await apiService.getTags();

    res.status(200).json(tags);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

//GET VARI CONTENT
router.get('/api/content', async (req, res) => {
  try {
    let content;

    const { regionId, tagId } = req.query;

    if (regionId && tagId) {
      content = await apiService.getContentsByRegionAndTag(regionId, tagId);
    } else if (regionId) {
      content = await apiService.getContentsByRegion(regionId);
    } else {
      content = await apiService.getContents();
    }

    if (!content || content.length === 0) {
      return res.status(404).json({ error: 'Not found' });
    }

    res.status(200).json(content);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

router.get('/api/content/by-tag/latest-by-region', async (req, res) => {
  const { tagId } = req.query;

  const content = await apiService.getLatestContentByRegionByTag(tagId);

  res.status(200).json(content);
});

router.get('/api/content/by-tag/top-liked-by-region', async (req, res) => {
  const { tagId } = req.query;

  const content = await apiService.getMostLikedContentByRegionByTag(tagId);

  res.status(200).json(content);
});

//GET SUB_TAGS
router.get(`/api/sub-tags`, async (req, res) => {
  try {
    const subTags = await apiService.getSubTags();

    res.status(200).json(subTags);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

//POST INSERT CONTENT
router.post(`/api/content`, async (req, res) => {
  try {
    const content = await apiService.createContent(req.body);

    res.status(201).json(content);
  } catch (error) {
    res.status(500).json({
      error: error.message,
    });
  }
});

//POST LIKE DISLIKE CONTENT
router.post('/api/content/like', async (req, res) => {
  try {
    const { id } = req.query;

    const content = await apiService.addLike(id);

    res.status(200).json(content);
  } catch (error) {
    res.status(500).json({
      error: error.message,
    });
  }
});

router.post('/api/content/dislike', async (req, res) => {
  try {
    const { id } = req.query;

    const content = await apiService.addDislike(id);

    res.status(200).json(content);
  } catch (error) {
    res.status(500).json({
      error: error.message,
    });
  }
});

module.exports = router;
