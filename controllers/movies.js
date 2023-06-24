const Movies = require('../models/movie');
const BadRequestError = require('../errors/BadRequestError');
const NotFoundError = require('../errors/NotFoundError');
const OwnerError = require('../errors/OwnerError');
const {
  MOVIES_EMPTY, MOVIES_INCORRECT_DATA, MOVIE_NOT_FOUND, MOVIE_NOT_OWNER, MOVIE_INVALID_ID,
} = require('../utils/constants');

module.exports.getMovies = (req, res, next) => {
  Movies.find({ owner: req.user._id })
    .then((movies) => {
      if (!movies) {
        throw new NotFoundError(MOVIES_EMPTY);
      }
      return res.send(movies);
    })
    .catch((err) => next(err));
};

module.exports.postMovies = (req, res, next) => {
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
  const owner = req.user._id;
  Movies.create({
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
  })
    .then((movies) => res.send(movies))
    .catch((err) => {
      if (err.name === 'ValidationError') {
        next(new BadRequestError(MOVIES_INCORRECT_DATA));
      } else {
        next(err);
      }
    });
};

module.exports.deleteMovies = (req, res, next) => {
  Movies.findById(req.params.movieId)
    .orFail(() => {
      throw new NotFoundError(MOVIE_NOT_FOUND);
    })
    .then((movie) => {
      const owner = movie.owner.toString();
      if (req.user._id === owner) {
        Movies.deleteOne(movie)
          .then(() => {
            res.send(movie);
          })
          .catch(next);
      } else {
        throw new OwnerError(MOVIE_NOT_OWNER);
      }
    })
    .catch((err) => {
      if (err.name === 'CastError') {
        next(new BadRequestError(MOVIE_INVALID_ID));
      } else {
        next(err);
      }
    });
};
