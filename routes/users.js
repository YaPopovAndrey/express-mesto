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
router.get('/users/me', getUser);
router.patch('/users/me', validateUser, updateUser);
router.patch('/users/me/avatar', validateAvatar, updateAvatar);

module.exports = router;
