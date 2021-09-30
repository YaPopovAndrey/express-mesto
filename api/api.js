/* eslint-disable linebreak-style */
const rateLimit = require('express-rate-limit');

module.exports.limiter = rateLimit({
  windowMs: 60 * 60 * 1000,
  max: 5,
  message:
      'С Вашего IP-адреса поступает слишком много запросов. Попробуйте чуть позже...',
});
