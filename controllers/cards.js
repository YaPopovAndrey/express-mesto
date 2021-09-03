const Card = require('../models/card');

module.exports.getCards = (req, res) => {
    Card.find({})
    .then(card => res.status(200).send({ data: card }))
    .catch(err => res.status(500).send({ message: err.message }));
};

module.exports.createCard = (req, res) => {
    const { name, link } = req.query;

    Card.create({ name, link })
    .then(card => res.status(201).send({ data: card }))
    .catch(err => res.status(500).send({ message: err.message }));
};

module.exports.deleteCard = (req, res) => {
    Card.findOneAndRemove(req.params.cardId)
    .then(card => res.status(200).send({ data: card }))
    .catch(err => res.status(500).send({ message: err.message }));
};