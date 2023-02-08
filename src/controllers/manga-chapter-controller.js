const { MangaChapter } = require('../models');
const createError = require('../utils/create-error');

exports.getMangaByChapter = async (req, res, next) => {
  try {
    //หยิบ ไอดีจากโพสแมนมามันคือไอดีของตอนมังงะ
    const { mangaId } = req.params;
    console.log(mangaId);
    const { chapter } = req.query;
    console.log(chapter);
    //เอาไปหาในดาต้าเบส
    const foundChapter = await MangaChapter.findOne({
      where: {
        chapTer: chapter,
        mangaId
      }
    });
    if (!foundChapter) {
      createError('chapter not found', 400);
    }
    //ส่งคืนให้หน้าบ้าน
    console.log(foundChapter);

    res.status(201).json({ foundChapter });
  } catch (err) {
    next(err);
  }
};
