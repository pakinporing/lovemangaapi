const fs = require('fs');
// const { Op } = require('sequelize');

const createError = require('../utils/create-error');
const { User } = require('../models');
const cloudinary = require('../utils/cloudinary');

exports.updateProfileImage = async (req, res, next) => {
  // console.log('++++++++++++++++++++++++++++++++++++++++++++++++++++++++');
  // console.log(req.files.profileImage);
  // console.log('++++++++++++++++++++++++++++++++++++++++++++++++++++++++');
  try {
    let value;
    if (!req.files.profileImage) {
      createError('profile image  is required');
    }

    if (req.files.profileImage) {
      const profileImage = await cloudinary.upload(
        req.files.profileImage[0].path
      );
      value = { profileImage };
    }

    await User.update(value, {
      where: { id: req.user.id }
    });

    res.status(200).json({ message: 'success update' });
  } catch (err) {
    next(err);
  } finally {
    if (req.files.profileImage) {
      fs.unlinkSync(req.files.profileImage[0].path);
      // console.log(
      //   '+++++++++++++++++++++++++++--------------------------------+++'
      // );
      // console.log(req.files.profileImage[0].path);
      // console.log('+++++++++++++++++++++++++++++-------------+');
    }
  }
};
