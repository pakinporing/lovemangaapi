const express = require('express');

const mangaChapterController = require('../controllers/manga-chapter-controller');

const router = express.Router();

router.get('/:mangaId', mangaChapterController.getMangaByChapter);

module.exports = router;
