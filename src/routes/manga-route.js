const express = require('express');

const mangaController = require('../controllers/manga-controller');
const upload = require('../middlewares/upload');
const authenticateMiddleware = require('../middlewares/authenticate');

const router = express.Router();

router.get('/:mangaId', mangaController.getMangaById);
router.post(
  '/',

  upload.single('mangaImageUrl'),
  mangaController.postManga
);
router.delete(
  '/:mangaId',

  mangaController.deleteMangaById
);

module.exports = router;
