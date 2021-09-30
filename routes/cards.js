/* eslint-disable linebreak-style */
const routerCard = require('express').Router();
const { limiter } = require('../api/api');

const {
  validateCard,
  validateId,
} = require('../middlewares/Validation');

const {
  getCards, createCard, deleteCard, likeCard, dislikeCard,
} = require('../controllers/cards');

routerCard.get('/cards', limiter, getCards);
routerCard.post('/cards', limiter, validateCard, createCard);
routerCard.delete('/cards/:cardId', limiter, validateId, deleteCard);
routerCard.put('/cards/:cardId/likes', limiter, validateId, likeCard);
routerCard.delete('/cards/:cardId/likes', limiter, validateId, dislikeCard);

module.exports = routerCard;
