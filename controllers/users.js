const User = require('../models/user');

module.exports.getUsers = (req, res) => {
    User.find({})
    .then(users => res.send({ data: users }))
    .catch(err => res.status(500).send({ message: err.message }));
};

module.exports.getUserId = (req, res) => {
    User.findById(req.params.id)
    .then(user => res.send({ data: user }))
    .catch(err => res.status(500).send({ message: err.message }));
};

module.exports.createUser = (req, res) => {
    User.create({ name, about, avatar })
    .then(user => res.send({ user: user }))
    .catch(err => res.status(500).send({ message: err.message }));
};  