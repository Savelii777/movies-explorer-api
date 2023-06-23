const jwt = require('jsonwebtoken');
const AuthorizedError = require('../errors/AuthorizedError');
const { AUTHORIZATION_NECESSARY } = require('../utils/constants');

module.exports = (req, res, next) => {
  const { authorization } = req.headers;
  if (!authorization || !authorization.startsWith('Bearer ')) {
    return next(new AuthorizedError(AUTHORIZATION_NECESSARY));
  }
  const token = authorization.replace('Bearer ', '');
  let payload;

  try {
    const { NODE_ENV, JWT_SECRET } = process.env;
    payload = jwt.verify(token, NODE_ENV === 'production' ? JWT_SECRET : 'dev-secret');
  } catch (err) {
    return next(new AuthorizedError(AUTHORIZATION_NECESSARY));
  }

  req.user = payload;
  return next();
};
