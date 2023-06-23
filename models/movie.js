const mongoose = require('mongoose');
const isURL = require('validator/lib/isURL');
const { LINK_PATTERN_ERROR } = require('../utils/constants');

// Определение схемы для модели "movie"
const movieSchema = new mongoose.Schema({
  country: {
    type: String,
    required: true,
  },
  director: {
    type: String,
    required: true,
  },
  duration: {
    type: Number,
    required: true,
  },
  year: {
    type: String,
    required: true,
  },
  description: {
    type: String,
    required: true,
  },
  image: {
    type: String,
    required: true,
    validate: [isURL, LINK_PATTERN_ERROR],
  },
  trailer: {
    type: String,
    required: true,
    validate: [isURL, LINK_PATTERN_ERROR],
  },
  owner: {
    required: true,
    ref: 'user',
    type: mongoose.Schema.Types.ObjectId,
  },
  movieId: {
    type: Number,
    required: true,
  },
  nameEN: {
    type: String,
    required: true,
  },
  nameRU: {
    type: String,
    required: true,
  },
});

// Экспорт модели "movie"
module.exports = mongoose.model('movie', movieSchema);
