/* eslint-disable linebreak-style */
/* eslint-disable consistent-return */
const jwt = require('jsonwebtoken');

const Unauthorized = require('../errors/Unauthorized');

module.exports = (req, res, next) => {
  const token = req.cookies.jwt;
  if (!token) {
    throw new Unauthorized('Нужно авторизоваться');
  }

  let payload;
  try {
    payload = jwt.verify(token, 'test-super-key');
    req.user = payload;
    next();
  } catch (err) {
    throw new Unauthorized('Нужно авторизоваться');
  }
};
