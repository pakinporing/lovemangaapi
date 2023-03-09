const { MangaChapter } = require('../models');
const createError = require('../utils/create-error');
const cloudinary = require('../utils/cloudinary');
const { Op } = require('sequelize');

exports.getMangaByChapter = async (req, res, next) => {
  try {
    //หยิบ ไอดีจากโพสแมนมามันคือไอดีของตอนมังงะ
    const { mangaId } = req.params;

    const { chapter } = req.query;

    //เอาไปหาในดาต้าเบส
    const foundChapter = await MangaChapter.findOne({
      where: {
        id: chapter
      }
    });
    if (!foundChapter) {
      createError('chapter not found', 400);
    }
    //ส่งคืนให้หน้าบ้าน

    res.status(201).json({ foundChapter });
  } catch (err) {
    next(err);
  }
};

//////////////////////////////////////////////////////////////////////////////////////

exports.postChapter = async (req, res, next) => {
  try {
    const { mangaId } = req.params;
    const chapter = { chapter: req.body.chapter };

    let url = { url: req.file?.path };

    const upManga = await MangaChapter.findOne({
      where: {
        chapter: chapter.chapter,
        mangaId: mangaId
      }
    });

    if (upManga) {
      createError('chapter  is already in use', 400);
    }

    const url2 = await cloudinary.upload(url.url);

    url = { url: url2 };

    await MangaChapter.create({
      chapter: chapter.chapter,
      mangaId: mangaId,
      url: url.url
    });

    res.status(201).json({ message: 'postChapter success. ' });
  } catch (err) {
    next(err);
  }
};
