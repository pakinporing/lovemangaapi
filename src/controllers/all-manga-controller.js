const { Manga } = require('../models');
const createError = require('../utils/create-error');

exports.getAllManga = async (req, res, next) => {
  try {
    const allManga = await Manga.findAll();
    if (!allManga) {
      createError('manga not found', 400);
    }

    res.status(200).json({ allManga });
  } catch (err) {
    next(err);
  }
};
