const express = require(`express`);

// Router Express che raccoglie tutti gli endpoint API principali dell'app.
const router = express.Router();

const multer = require('multer');

// Configurazione dello storage in memoria RAM per Multer
const upload = multer({
  storage: multer.memoryStorage(),
  limits: { fileSize: 10 * 1024 * 1024 },
});

// Service che contiene le query e le operazioni sul database.
const apiService = require('../services/ApiService');

// GET /api/regions
// Restituisce l'elenco completo delle regioni.
router.get(`/api/region`, async (req, res) => {
  try {
    let region;

    const { regionId } = req.query;

    if (regionId) {
      region = await apiService.getRegionById(regionId);
    } else {
      region = await apiService.getRegions();
    }

    res.status(200).json(region);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

// GET /api/regions/contents-count
// Restituisce per ogni regione il numero di contenuti collegati.
router.get('/api/region/contents-count', async (req, res) => {
  const { regionId } = req.query;

  const content = await apiService.getContentsCountByRegion(regionId);

  res.status(200).json(content);
});

// GET /api/tags
// Restituisce tutti i tag usati per classificare i contenuti.
router.get(`/api/tag`, async (req, res) => {
  try {
    const tags = await apiService.getTags();

    res.status(200).json(tags);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

// GET /api/content
// Restituisce i contenuti, eventualmente filtrati tramite query string:
// - regionId: filtra per regione
// - tagId: filtra per tag, se presente insieme a regionId
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

// GET /api/content/by-tag/latest-by-region
// Endpoint dedicato ai dati "latest by region" richiesti tramite tagId.
router.get('/api/content/by-tag/latest-by-region', async (req, res) => {
  const { tagId } = req.query;

  const content = await apiService.getContentsCountByRegion(tagId);

  res.status(200).json(content);
});

// GET /api/content/by-tag/top-liked-by-region
// Restituisce, per ogni regione, il contenuto con più like filtrato per tagId.
router.get('/api/content/by-tag/top-liked-by-region', async (req, res) => {
  const { tagId } = req.query;

  const content = await apiService.getMostLikedContentByRegionByTag(tagId);

  res.status(200).json(content);
});

// GET /api/content/:id
// Restituisce un singolo contenuto per la pagina dettaglio.
router.get('/api/content/:id', async (req, res) => {
  try {
    const content = await apiService.getContentById(req.params.id);

    if (!content) {
      return res.status(404).json({ error: 'Not found' });
    }

    res.status(200).json(content);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

// GET /api/sub-tags
// Restituisce tutti i sotto-tag disponibili.
router.get(`/api/sub-tag`, async (req, res) => {
  try {
    const subTags = await apiService.getSubTags();

    res.status(200).json(subTags);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

// POST /api/content
// Crea un nuovo contenuto usando i dati inviati nel body della richiesta.
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

// POST /api/content/like
// Incrementa i like del contenuto indicato tramite query string id.
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

// POST /api/content/dislike
// Incrementa i dislike del contenuto indicato tramite query string id.
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

// ROUTE POST UPLOAD IMAGE
router.post('/api/upload', upload.single('image'), async (req, res) => {
  try {
    if (!req.file) {
      return res.status(400).json({ error: 'Nessun file ricevuto.' });
    }

    // Chiamata al servizio per caricare su Supabase
    const publicUrl = await apiService.uploadImageToSupabase(req.file);

    if (!publicUrl) {
      return res.status(500).json({ error: 'Caricamento fallito.' });
    }

    // Restituisce l'URL finale al frontend
    res.status(200).json({ publicUrl: publicUrl });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

// Esporta il router per montarlo nell'app Express principale.
module.exports = router;
