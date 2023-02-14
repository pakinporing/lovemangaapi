const cloudinary = require('../config/cloudinary');

exports.upload = async (filePath) => {
  const result = await cloudinary.uploader.upload(filePath, {
    unique_filename: false,
    use_filename: true,
    overwrite: true
  });
  return result.secure_url;
};
