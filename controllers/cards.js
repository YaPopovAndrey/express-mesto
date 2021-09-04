const Card = require('../models/card');

module.exports.getCards = (req, res) => {
    Card.find({})
    .then((card) => {
        if(card.length === 0) {
            return res.status(400).send({ message: 'Нет ни одной карточки' })
        }
        return res.status(200).send(card)
    })
    .catch(err => res.status(500).send({ message: err.message }));
};

module.exports.createCard = (req, res) => {
    const { name, link } = req.query;

    Card.create({ name, link })
    .then(card => res.status(201).send(card))
    .catch((err) => {
        if (err.name === "ValidationError") {
            return res.status(400).send({
                message: `${Object.values(err.errors)
                    .map((error) => error.message)
                    .join(", ")},`
            });
        } return res.status(500).send({ message: err.message });
    });
};

module.exports.deleteCard = (req, res) => {
    Card.findOneAndRemove(req.params.cardId)
    .then((card) => {
        if(!req.params.cardId) {
            res.status(404).send({ message: 'text' });
            return;
        } else {
            res.status(200).send(card)
        }
    })
    .catch(err => res.status(500).send({ message: err.message }));
};

module.exports.likeCard = (req, res) => {
    Card.findByIdAndUpdate(req.params.cardId,
        { $addToSet: { likes: req.user._id } },
        { new: true },
      )
    .then(card => res.status(200).send({ data: card }))
    .catch(err => res.status(500).send({ message: err.message }));
}
    
module.exports.dislikeCard = (req, res) => {
    Card.findByIdAndUpdate(req.params.cardId,
        { $pull: { likes: req.user._id } },
        { new: true },
      )
    .then(card => res.status(200).send({ data: card }))
    .catch(err => res.status(500).send({ message: err.message }));
  }