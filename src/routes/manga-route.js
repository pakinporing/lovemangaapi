const express = require('express');

const mangaController = require('../controllers/manga-controller');
const upload = require('../middlewares/upload');

const router = express.Router();

router.get('/:mangaId', mangaController.getMangaById);
router.post('/', upload.single('mangaImageUrl'), mangaController.postManga);

module.exports = router;
