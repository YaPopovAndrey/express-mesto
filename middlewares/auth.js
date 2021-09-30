/* eslint-disable linebreak-style */
/* eslint-disable consistent-return */
const jwt = require('jsonwebtoken');

const { JWT_SECRET = 'dev-key' } = process.env;

const Unauthorized = require('../errors/Unauthorized');

module.exports = (req, res, next) => {
  const token = req.cookies.jwt;
  if (!token) {
    throw new Unauthorized('Нужно авторизоваться');
  }

  let payload;
  try {
    payload = jwt.verify(token, JWT_SECRET);
    req.user = payload;
    next();
  } catch (err) {
    throw new Unauthorized('Нужно авторизоваться');
  }
};
