const mongoose = require('mongoose');

const cardShema = new mongoose.Schema({
    name: {
        required: true,
        type: String,
        minlength: 2,
        maxlength: 30,
    },
    link: {
        required: true,
        type: String,
    },
    owner: {
        required: true,
        type: Object,
        ref: 'user',
    },
    likes: [{
        type: Object,
        default: [],
    }],
    createdAt: {
        type: Date,
        default: Date.now,
    }
}, { versionKey: false });

module.exports = mongoose.model('card', cardShema);