/* eslint-disable linebreak-style */
/* eslint-disable no-shadow */
const Card = require('../models/card');

const NotFound = require('../errors/NotFound');
const BadRequest = require('../errors/BadRequest');
const Forbidden = require('../errors/Forbidden');

module.exports.getCards = (req, res, next) => {
  Card.find({})
    .then((card) => res.status(200).send(card))
    .catch(next);
};

module.exports.createCard = (req, res, next) => {
  const { name, link } = req.body;

  Card.create({ name, link, owner: req.user._id })
    .then((card) => res.status(201).send(card))
    .catch((err) => {
      if (err.name === 'ValidationError') {
        throw new BadRequest('Одно из обязательных полей не заполнено или заполнено с ошибкой');
      }
    })
    .catch(next);
};

module.exports.deleteCard = (req, res, next) => {
  Card.findById(req.params.cardId)
    .then((card) => {
      if (card.owner !== req.user._id) {
        throw new Forbidden('Нельзя удалить чужую карточку');
      }
    })
    .then(() => {
      Card.findByIdAndRemove(req.params.cardId, { new: true })
        .then((card) => {
          if (!card) {
            throw new NotFound('С данным ID карточек не обнаружено');
          } else {
            res.status(200).send({ message: 'Карточка удалена' });
          }
        })
        .catch((err) => {
          if (err.name === 'CastError') {
            throw new BadRequest('Невалидный id');
          }
        })
        .catch(next);
    })
    .catch(next);
};

module.exports.likeCard = (req, res, next) => {
  Card.findByIdAndUpdate(req.params.cardId,
    { $addToSet: { likes: req.user._id } },
    { new: true })
    // eslint-disable-next-line consistent-return
    .then((card) => {
      if (!card) {
        throw new NotFound('С данным ID карточек не обнаружено');
      } else {
        return res.status(200).send(card);
      }
    })
    .catch((err) => {
      if (err.name === 'CastError') {
        throw new BadRequest('Невалидный id');
      }
    })
    .catch(next);
};

module.exports.dislikeCard = (req, res, next) => {
  Card.findByIdAndUpdate(req.params.cardId,
    { $pull: { likes: req.user._id } },
    { new: true })
    .then((card) => {
      if (!card) {
        throw new NotFound('С данным ID карточек не обнаружено');
      } else {
        res.status(200).send(card);
      }
    })
    .catch((err) => {
      if (err.name === 'CastError') {
        throw new BadRequest('Невалидный id');
      }
    })
    .catch(next);
};
