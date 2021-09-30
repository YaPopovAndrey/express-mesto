/* eslint-disable linebreak-style */
const jwt = require('jsonwebtoken');
const bcrypt = require('bcryptjs');
const User = require('../models/user');
const NotFound = require('../errors/NotFound');
const BadRequest = require('../errors/BadRequest');
const ConflictingRequest = require('../errors/ConflictingRequest');
const Unauthorized = require('../errors/Unauthorized');

const { JWT_SECRET = 'dev-key' } = process.env;

module.exports.login = (req, res, next) => {
  const { email, password } = req.body;

  return User.findUserByCredentials(email, password)
    .then((user) => {
      const token = jwt.sign({ _id: user._id }, JWT_SECRET, { expiresIn: '7d' });

      res
        .cookie('jwt', token, {
          maxAge: 36000 * 24 * 7,
          httpOnly: true,
          sameSite: true,
        })
        .send({ message: 'Авторизация успешна' });
    })
    .catch((err) => {
      throw new Unauthorized(`Ошибка: ${err.message}`);
    })
    .catch(next);
};

module.exports.getUsers = (req, res, next) => {
  User.find({})
    .then((user) => res.status(200).send(user))
    .catch(next);
};

module.exports.getUser = (req, res, next) => {
  User.findById(req.user._id)
    .then((user) => {
      if (!user) {
        throw new NotFound('Пользователя с таким ID не существует');
      }
      return res.status(200).send(user);
    })
    .catch((err) => {
      if (err.name === 'CastError') {
        throw new BadRequest('Невалидный id');
      }
    })
    .catch(next);
};

module.exports.createUser = (req, res, next) => {
  const {
    name, about, avatar, email, password,
  } = req.body;

  bcrypt.hash(password, 10)
    .then((hash) => User.create({
      name,
      about,
      avatar,
      email,
      password: hash,
    }))
    .then(() => {
      User.findOne({ email })
        .then((user) => res.status(201).send(user));
    })
    .catch((err) => {
      if (err.name === 'ValidationError') {
        throw new BadRequest('Ошибка валидации!');
      } else if (err.name === 'MongoServerError' && err.code === 11000) {
        throw new ConflictingRequest('Данный E-mail уже используется другим пользователем!');
      }
    })
    .catch(next);
};

module.exports.updateUser = (req, res, next) => {
  const { name, about } = req.body;

  User.findByIdAndUpdate(req.user._id, {
    name,
    about,
  }, {
    new: true,
    runValidators: true,
  })
    .then((user) => {
      if (!name || !about) {
        throw new BadRequest('Одно или несколько полей не заполнено');
      } else if (!user) {
        throw new BadRequest('Пользователя с таким ID не существует');
      }
      return res.status(200).send(user);
    })
    .catch((err) => {
      if (err.name === 'ValidationError') {
        throw new BadRequest('Ошибка валидации!');
      } else if (err.name === 'CastError') {
        throw new BadRequest('Невалидный id');
      }
    })
    .catch(next);
};

module.exports.updateAvatar = (req, res, next) => {
  const { avatar } = req.body;

  User.findByIdAndUpdate(req.user._id, {
    avatar,
  }, {
    new: true,
    runValidators: true,
  })
    .then((user) => {
      if (!avatar) {
        throw new BadRequest('Поле не заполнено');
      } else if (!user) {
        throw new BadRequest('Пользователя с таким ID не существует');
      }
      return res.status(200).send(user);
    })
    .catch((err) => {
      if (err.name === 'ValidationError') {
        throw new BadRequest('Ошибка валидации!');
      } else if (err.name === 'CastError') {
        throw new BadRequest('Невалидный id');
      }
    })
    .catch(next);
};
