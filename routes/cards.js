const routerCard = require('express').Router();

const { getCards, createCard, deleteCard } = require('../controllers/cards');

routerCard.get('/cards', getCards);
routerCard.post('/cards', createCard);
routerCard.delete('/cards/:cardId', deleteCard);

module.exports = routerCard;