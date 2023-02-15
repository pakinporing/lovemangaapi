const { Manga, MangaChapter } = require('../models');
const createError = require('../utils/create-error');
const cloudinary = require('../utils/cloudinary');

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

//////////////////////////////////////////////////////////////////////////////////////////

exports.postManga = async (req, res, next) => {
  try {
    const mangaName = { mangaName: req.body.mangaName };
    const description = { description: req.body.description };
    let mangaImageUrl = { mangaImageUrl: req.file?.path };

    const upManga = await Manga.findOne({
      where: {
        mangaName: mangaName.mangaName || ''
      }
    });
    if (upManga) {
      createError('manga  is already in use', 400);
    }

    const mangaImageUrl2 = await cloudinary.upload(mangaImageUrl.mangaImageUrl);

    mangaImageUrl = { mangaImageUrl: mangaImageUrl2 };

    const upmanga = await Manga.create({
      mangaName: mangaName.mangaName,
      description: description.description,
      mangaImageUrl: mangaImageUrl.mangaImageUrl
    });

    res.status(201).json({ message: 'postManga success. ' });
  } catch (err) {
    next(err);
  }
};

//////////////////////////////////////////////////////////////////////////////////////////////

exports.deleteMangaById = async (req, res, next) => {
  try {
    const { mangaId } = req.params;
    if (!mangaId) {
      createError('mangaId not found', 400);
    }

    const manga = await Manga.destroy({
      where: {
        id: mangaId
      }
    });
    if (!manga) {
      createError('manga not found', 400);
    }

    res.status(200).json({ message: 'deleteManga success. ' });
  } catch (err) {
    next(err);
  }
};
