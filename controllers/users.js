const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
const User = require('../models/user');

const BadRequestError = require('../errors/BadRequestError');
const DuplicateError = require('../errors/DuplicateError');
const NotFoundError = require('../errors/NotFoundError');
const {
  USER_EXISTS, USER_INCORRECT_DATA, USER_NOT_FOUND, USER_UPDATE_INCORRECT_DATA,
} = require('../utils/constants');

const { NODE_ENV, JWT_SECRET } = process.env;

module.exports.createUser = async (req, res, next) => {
  try {
    const { name, email, password } = req.body;
    const hash = await bcrypt.hash(password, 10);
    const user = await User.create({ name, email, password: hash });
    res.send({
      name: user.name,
      _id: user._id,
      email: user.email,
    });
  } catch (err) {
    if (err.code === 11000) {
      next(new DuplicateError(USER_EXISTS));
    } else if (err.name === 'ValidationError') {
      next(new BadRequestError(USER_INCORRECT_DATA));
    } else {
      next(err);
    }
  }
};

// post/signin
module.exports.login = async (req, res, next) => {
  try {
    const { email, password } = req.body;
    const user = await User.findUserByCredentials(email, password);
    const token = jwt.sign({ _id: user._id }, NODE_ENV === 'production' ? JWT_SECRET : 'dev-secret', { expiresIn: '7d' });
    res.send({ token });
  } catch (err) {
    next(err);
  }
};

module.exports.getUser = async (req, res, next) => {
  try {
    const user = await User.findById(req.user._id);
    if (!user) {
      throw new NotFoundError(USER_NOT_FOUND);
    }
    res.send(user);
  } catch (err) {
    next(err);
  }
};

module.exports.updateUser = async (req, res, next) => {
  try {
    const { name, email } = req.body;
    const user = await User.findByIdAndUpdate(
      req.user._id,
      { name, email },
      { new: true, runValidators: true },
    );
    if (!user) {
      throw new NotFoundError(USER_NOT_FOUND);
    }
    res.send(user);
  } catch (err) {
    if (err.code === 11000) {
      next(new DuplicateError(USER_EXISTS));
    } else if (err.name === 'ValidationError') {
      next(new BadRequestError(USER_UPDATE_INCORRECT_DATA));
    } else {
      next(err);
    }
  }
};
