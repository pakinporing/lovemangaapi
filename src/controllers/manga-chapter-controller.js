const { MangaChapter } = require('../models');
const createError = require('../utils/create-error');

exports.getMangaByChapter = async (req, res, next) => {
  try {
    //หยิบ ไอดีจากโพสแมนมามันคือไอดีของตอนมังงะ
    const { mangaId } = req.params;

    const { chapter } = req.query;

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

    res.status(201).json({ foundChapter });
  } catch (err) {
    next(err);
  }
};

//////////////////////////////////////////////////////////////////////////////////////

// exports.postMangaChapter = async (req, res, next) => {
//   try {
//     const mangaName = { mangaName: req.body.mangaName };
//     const description = { description: req.body.description };
//     let mangaImageUrl = { mangaImageUrl: req.file?.path };

//     const upManga = await MangaChapter.findOne({
//       where: {
//         mangaName: mangaName.mangaName || ''
//       }
//     });
//     if (upManga) {
//       createError('mangaChapter  is already in use', 400);
//     }

//     // const mangaImageUrl2 = await cloudinary.upload(mangaImageUrl.mangaImageUrl);

//     // mangaImageUrl = { mangaImageUrl: mangaImageUrl2 };

//     const upmanga = await Manga.create({
//       mangaName: mangaName.mangaName,
//       description: description.description,
//       mangaImageUrl: mangaImageUrl.mangaImageUrl
//     });

//     res.status(201).json({ message: 'postChapter success. ' });
//   } catch (err) {
//     next(err);
//   }
// };
