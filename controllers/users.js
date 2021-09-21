/* eslint-disable linebreak-style */
const validator = require('validator');
const User = require('../models/user');

module.exports.getUsers = (req, res) => {
  User.find({})
    .then((user) => res.status(200).send(user))
    .catch((err) => res.status(500).send({ message: `Ошибка:${err.name}:${err.message}` }));
};

module.exports.getUser = (req, res) => {
  User.findById(req.params.userId)
    .then((user) => {
      if (!user) {
        return res.status(404).send({ message: 'Пользователя с таким ID не существует' });
      }
      return res.status(200).send(user);
    })
    .catch((err) => {
      if (err.name === 'CastError') {
        res.status(400).send({ message: 'Невалидный id' });
      } else {
        res.status(500).send({ message: `Ошибка:${err.name}:${err.message}` });
      }
    });
};

module.exports.createUser = (req, res) => {
  const {
    name, about, avatar, email, password,
  } = req.body;
  const validatorEmail = validator.isEmail(email);

  User.create({
    name, about, avatar, email, password,
  })
    .then((user) => {
      if (!validatorEmail) {
        return res.status(400).send({ message: 'Неверно введен email' });
      }
      return res.status(201).send(user);
    })
    .catch((err) => {
      if (err.name === 'ValidationError') {
        return res.status(400).send({
          message: `${Object.values(err.errors)
            .map((error) => error.message)
            .join(', ')},`,
        });
      } return res.status(500).send({ message: `Ошибка:${err.name}:${err.message}` });
    });
};

module.exports.updateUser = (req, res) => {
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
        return res.status(404).send({ message: 'Одно или несколько полей не заполнено' });
      } if (!user) {
        return res.status(404).send({ message: 'Пользователя с таким ID не существует' });
      }
      return res.status(200).send(user);
    })
    .catch((err) => {
      if (err.name === 'ValidationError') {
        return res.status(400).send({
          message: `${Object.values(err.errors)
            .map((error) => error.message)
            .join(', ')},`,
        });
      } if (err.name === 'CastError') {
        return res.status(400).send({ message: 'Невалидный id' });
      }
      return res.status(500).send({ message: `Ошибка:${err.name}:${err.message}` });
    });
};

module.exports.updateAvatar = (req, res) => {
  const { avatar } = req.body;

  User.findByIdAndUpdate(req.user._id, {
    avatar,
  }, {
    new: true,
    runValidators: true,
  })
    .then((user) => {
      if (!avatar) {
        return res.status(404).send({ message: 'Поле не заполнено' });
      } if (!user) {
        return res.status(404).send({ message: 'Пользователя с таким ID не существует' });
      }
      return res.status(200).send(user);
    })
    .catch((err) => {
      if (err.name === 'ValidationError') {
        return res.status(400).send({
          message: `${Object.values(err.errors)
            .map((error) => error.message)
            .join(', ')},`,
        });
      } if (err.name === 'CastError') {
        return res.status(400).send({ message: 'Невалидный id' });
      }
      return res.status(500).send({ message: `Ошибка:${err.name}:${err.message}` });
    });
};
