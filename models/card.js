const mongoose = require('mongoose');

const cardShema = new mongoose.Schema({
    name: {
        type: String,
        minlength: 2,
        maxlength: 30,
        require: true,
    },
    link: {
        type: String,
        require: true,
    },
    owner: {
        type: ObjectId,
        require: true,
        ref: 'user',
    },
    likes: [{
        type: ObjectId,
        default: [],
    }],
    createdAt: {
        type: Date,
        default: Date.now,
    }
});

module.exports = mongoose.model('card', cardShema);