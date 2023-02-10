const express = require('express');

const AllMangaController = require('../controllers/all-manga-controller');

const router = express.Router();

router.get('/manga', AllMangaController.getAllManga);

module.exports = router;
