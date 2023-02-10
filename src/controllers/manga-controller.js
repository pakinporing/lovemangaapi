const { Manga, MangaChapter } = require('../models');
const createError = require('../utils/create-error');

exports.getMangaById = async (req, res, next) => {
  try {
    const { mangaId } = req.params;
    if (!mangaId) {
      createError('mangaId not found', 400);
    }

    const manga = await Manga.findAll({
      where: {
        id: mangaId
      },
      include: [
        {
          model: MangaChapter
        }
      ]
    });
    if (!manga) {
      createError('manga not found', 400);
    }

    res.status(200).json({ manga });
  } catch (err) {
    next(err);
  }
};
