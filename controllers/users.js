const User = require('../models/user');

module.exports.getUsers = (req, res) => {
    User.find({})
    .then((user) => {
        if(user.length === 0) {
            return res.status(400).send({ message: 'Нет ни одного пользователя' })
        }
        return res.status(200).send(user)
    })
    .catch(err => res.status(500).send({ message: err.message }));
};

module.exports.getUser = (req, res) => {
    User.findById(req.params.userId)
    .then((user) => {
        if (!user) {
            return res.status(404).send({ message: 'Пользователя с таким ID не существует' })
        }
        return res.status(200).send(user)
    }) 
    .catch(err => res.status(500).send({ message: err.message }));
};

module.exports.createUser = (req, res) => {
    const { name, about, avatar } = req.query;

    User.create({ name, about, avatar })
    .then(user => res.status(201).send(user))
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

module.exports.updateUser = (req, res) => {
    const { name, about } = req.query;

    User.findByIdAndUpdate(req.user._id,{
        name: name,
        about: about,
    }, {
        new: true,
        runValidators: true
    })
    .then((user) => {
        if(!name || !about) {
            return res.status(400).send({ message: 'Одно или несколько полей не заполнено' })
        } else if(!user) {
            return res.status(404).send({ message: 'Пользователя с таким ID не существует' })
        }
        return res.status(200).send(user)
    })
    .catch(err => res.status(500).send({ message: err.message }));
};

module.exports.updateAvatar = (req, res) => {
    const { avatar } = req.query;

    User.findByIdAndUpdate(req.user._id,{
        avatar: avatar,
    }, {
        new: true,
        runValidators: true
    })
    .then((user) => {
        if(!avatar) {
            return res.status(400).send({ message: 'Поле не заполнено' })
        } else if(!user) {
            return res.status(404).send({ message: 'Пользователя с таким ID не существует' })
        }
        return res.status(200).send(user)
    })
    .catch(err => res.status(500).send({ message: err.message }));
};