/* eslint-disable linebreak-style */
const router = require('express').Router();
const { limiter } = require('../api/api');

const {
  getUsers, getUser, updateUser, updateAvatar,
} = require('../controllers/users');

const {
  validateUser,
  validateAvatar,
} = require('../middlewares/Validation');

router.get('/users', limiter, getUsers);
router.get('/users/me', limiter, getUser);
router.patch('/users/me', limiter, validateUser, updateUser);
router.patch('/users/me/avatar', limiter, validateAvatar, updateAvatar);

module.exports = router;
