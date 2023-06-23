const Movies = require('../models/movie');
const BadRequestError = require('../errors/BadRequestError');
const NotFoundError = require('../errors/NotFoundError');
const OwnerError = require('../errors/OwnerError');
const {
  MOVIES_EMPTY, MOVIES_INCORRECT_DATA, MOVIE_NOT_FOUND, MOVIE_NOT_OWNER, MOVIE_INVALID_ID,
} = require('../utils/constants');

module.exports.getMovies = async (req, res, next) => {
  try {
    const { _id: owner } = req.user;
    const movies = await Movies.find({ owner });
    if (!movies) {
      throw new NotFoundError(MOVIES_EMPTY);
    }
    return res.send(movies);
  } catch (err) {
    next(err);
  }
  return null;
};

module.exports.postMovies = async (req, res, next) => {
  try {
    const { _id: owner } = req.user;
    const {
      country,
      director,
      duration,
      year,
      description,
      image,
      trailerLink,
      thumbnail,
      movieId,
      nameEN,
      nameRU,
    } = req.body;
    const movies = await Movies.create({
      country,
      director,
      duration,
      year,
      description,
      image,
      trailerLink,
      thumbnail,
      movieId,
      nameEN,
      nameRU,
      owner,
    });
    res.send(movies);
  } catch (err) {
    if (err.name === 'ValidationError') {
      next(new BadRequestError(MOVIES_INCORRECT_DATA));
    } else {
      next(err);
    }
  }
};

module.exports.deleteMovies = async (req, res, next) => {
  try {
    const { movieId } = req.params;
    const { _id: userId } = req.user;
    const movie = await Movies.findById(movieId).orFail(() => {
      throw new NotFoundError(MOVIE_NOT_FOUND);
    });
    const owner = movie.owner.toString();
    if (userId === owner) {
      await Movies.deleteOne(movie);
      res.send(movie);
    } else {
      throw new OwnerError(MOVIE_NOT_OWNER);
    }
  } catch (err) {
    if (err.name === 'CastError') {
      next(new BadRequestError(MOVIE_INVALID_ID));
    } else {
      next(err);
    }
  }
};
