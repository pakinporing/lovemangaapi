const express = require('express');

const mangaController = require('../controllers/manga-controller');

const router = express.Router();

router.get('/:mangaId', mangaController.getMangaById);

module.exports = router;
