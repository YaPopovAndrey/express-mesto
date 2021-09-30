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
routerCard.post('/cards', validateCard, createCard);
routerCard.delete('/cards/:cardId', validateId, deleteCard);
routerCard.put('/cards/:cardId/likes', validateId, likeCard);
routerCard.delete('/cards/:cardId/likes', validateId, dislikeCard);

module.exports = routerCard;
