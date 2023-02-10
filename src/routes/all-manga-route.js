const express = require('express');

const AllMangaController = require('../controllers/all-manga-controller');

const router = express.Router();

router.get('/', AllMangaController.getAllMangaById);

module.exports = router;
