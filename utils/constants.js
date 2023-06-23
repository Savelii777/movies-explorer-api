const URL_PATTERN = /https?:\/\/(www\.)?[-a-zA-Z0-9@:%._+~#=]{1,256}\.[a-zA-Z0-9()]{1,6}\b([-a-zA-Z0-9()@:%_+.~#?&//=]*)/;

const AUTHORIZATION_NECESSARY = 'Необходима авторизация';
const SERVER_ERROR = 'На сервере произошла ошибка';
const LINK_PATTERN_ERROR = 'Неправильный формат ссылки';
const MIN_LENGTH = 'Минимальная длинна 2 символа';
const MAX_LENGTH = 'Максимальная длинна 30 символов';
const EMAIL_PATTERN_ERROR = 'Неправильный формат почты';
const EMAIL_OR_PASSWORD_ERROR = 'Неправильные почта или пароль';
const PATH_ERROR = 'Неправильный путь';

const MOVIES_EMPTY = 'Фильмы отсутствуют';
const MOVIES_INCORRECT_DATA = 'Переданы некорректные данные для создания нового фильма';
const MOVIE_NOT_FOUND = 'Фильм с данным _id не найден.';
const MOVIE_INVALID_ID = 'Передан некорректный id';
const MOVIE_NOT_OWNER = 'Чужой фильм удалить нельзя';
const MOVIE_ID_NOT_FOUND = 'Id фильма не найден';

const USER_EXISTS = 'Пользователь с такой почтой уже зарегистрирован';
const USER_INCORRECT_DATA = 'Переданы некорректные данные при создании пользователя';
const USER_UPDATE_INCORRECT_DATA = 'Переданы некорректные данные при обновлении пользователя';
const USER_NOT_FOUND = 'Пользователь с данным id не найден';

module.exports = {
  URL_PATTERN,
  MOVIES_EMPTY,
  MOVIES_INCORRECT_DATA,
  MOVIE_NOT_FOUND,
  MOVIE_NOT_OWNER,
  MOVIE_ID_NOT_FOUND,
  USER_EXISTS,
  USER_INCORRECT_DATA,
  USER_NOT_FOUND,
  AUTHORIZATION_NECESSARY,
  SERVER_ERROR,
  LINK_PATTERN_ERROR,
  MIN_LENGTH,
  MAX_LENGTH,
  EMAIL_PATTERN_ERROR,
  EMAIL_OR_PASSWORD_ERROR,
  PATH_ERROR,
  USER_UPDATE_INCORRECT_DATA,
  MOVIE_INVALID_ID,
};
