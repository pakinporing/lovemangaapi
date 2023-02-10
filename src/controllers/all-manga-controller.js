const { Manga } = require('../models');
const createError = require('../utils/create-error');

exports.getAllMangaById = async (req, res, next) => {
  try {
    const { mangaId } = req.params;
    if (!mangaId) {
      createError('manga not found', 400);
    }

    const allManga = await Manga.findAll({
      where: {
        id: mangaId
      }
    });
    if (!allManga) {
      createError('manga not found', 400);
    }

    res.status(200).json({ allManga });
  } catch (err) {
    next(err);
  }
};
