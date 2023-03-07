const express = require('express');

const mangaChapterController = require('../controllers/manga-chapter-controller');

const router = express.Router();
const upload = require('../middlewares/upload');

router.get('/:mangaId', mangaChapterController.getMangaByChapter);
router.post(
  '/:mangaId',
  upload.single('url'),
  mangaChapterController.postChapter
);

module.exports = router;
