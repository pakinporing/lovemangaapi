const {
  validateRegister,
  validateLogin
} = require('../validators/auth-validators');
const bcrypt = require('bcryptjs');

const { User } = require('../models');
const createError = require('../utils/create-error');
const jwt = require('jsonwebtoken');

exports.register = async (req, res, next) => {
  try {
    const value = validateRegister(req.body);

    const user = await User.findOne({
      where: {
        email: value.email || ''
      }
    });
    if (user) {
      createError('email  is already in use', 400);
    }

    value.password = await bcrypt.hash(value.password, 12);
    await User.create(value);

    res
      .status(201)
      .json({ message: 'register success. please log in to continue.' });
  } catch (err) {
    next(err);
  }
};

//////////////////////////////////////////////////////////////////////////////////

exports.login = async (req, res, next) => {
  try {
    const value = validateLogin(req.body);

    const user = await User.findOne({
      where: {
        email: value.email
      }
    });
    if (!user) {
      createError('invalid email or password', 400);
    }

    const isCorrect = await bcrypt.compare(value.password, user.password);
    if (!isCorrect) {
      createError('invalid email or password', 400);
    }

    const accessToken = jwt.sign(
      {
        id: user.id,
        firstName: user.firstName,
        userName: user.userName,
        lastName: user.lastName,
        email: user.email,
        role: user.role,

        profileImage: user.profileImage,

        createdAt: user.createdAt,
        updatedAt: user.updatedAt
      },
      process.env.JWT_SECRET_KEY,
      {
        expiresIn: process.env.JWT_EXPIRES_IN
      }
    );

    res.status(200).json({ accessToken });
  } catch (err) {
    next(err);
  }
};

exports.getMe = (req, res, next) => {
  res.status(200).json({ user: req.user });
};
