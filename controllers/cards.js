const Card = require('../models/card');

module.exports.getCards = (req, res) => {
    Card.find({})
    .then((card) => {
        if(card.length === 0) {
            return res.status(404).send({ message: 'Нет ни одной карточки' })
        }
        return res.status(200).send(card)
    })
    .catch(err => res.status(500).send({ message: `Ошибка:${err.name}:${err.message}` }));
};

module.exports.createCard = (req, res) => {
    const { name, link } = req.query;

    Card.create({ name, link, owner: req.user._id })
    .then(card => res.status(201).send(card))
    .catch((err) => {
        if (err.name === "ValidationError") {
            return res.status(400).send({
                message: `${Object.values(err.errors)
                    .map((error) => error.message)
                    .join(", ")},`
            });
        } return res.status(500).send({ message: `Ошибка:${err.name}:${err.message}` });
    });
};

module.exports.deleteCard = (req, res) => {
    Card.findByIdAndRemove(req.params.cardId, {new: true})
    .then((card) => {
        if(!card) {
            res.status(404).send({ message: 'С данным ID карточек не обнаружено' });
            return;
        } else {
            res.status(200).send({ message: 'Карточка удалена' })
        }
    })
    .catch(err => res.status(500).send({ message: `Ошибка:${err.name}:${err.message}` }));
};

module.exports.likeCard = (req, res) => {
    Card.findByIdAndUpdate(req.params.cardId,
        { $addToSet: { likes: req.user._id } },
        { new: true },
      )
    .then((card) => {
        if(!card) {
            res.status(400).send({ message: 'Данные некорректны' });
            return;
        } else {
            return res.status(200).send(card);
        }
    })
    .catch(err => res.status(500).send({ message: `Ошибка:${err.name}:${err.message}` }));
}
    
module.exports.dislikeCard = (req, res) => {
    Card.findByIdAndUpdate(req.params.cardId,
        { $pull: { likes: req.user._id } },
        { new: true },
      )
      .then((card) => {
        if(!card) {
            res.status(400).send({ message: 'Данные некорректны' });
            return;
        } else {
            res.status(200).send(card);
        }
    })
    .catch(err => res.status(500).send({ message: `Ошибка:${err.name}:${err.message}` }));
  }