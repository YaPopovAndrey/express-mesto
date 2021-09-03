const User = require('../models/user');

module.exports.getUsers = (req, res) => {
    User.find({})
    .then(users => res.status(200).send({ data: users }))
    .catch(err => res.status(500).send({ message: err.message }));
};

module.exports.getUserId = (req, res) => {
    User.findById(req.params.id)
    .then(user => res.status(200).send({ data: user }))
    .catch(err => res.status(500).send({ message: err.message }));
};

module.exports.createUser = (req, res) => {
    const { name, about, avatar } = req.query;

    User.create({ name, about, avatar })
    .then(user => res.status(201).send(user))
    .catch(err => res.status(500).send({ message: err.message }));
};