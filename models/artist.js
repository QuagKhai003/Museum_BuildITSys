const mongoose = require('mongoose');
const Visitor = require('./visitor');

const artistSchema = mongoose.Schema({
    firstName: {
        type: String,
        minLength: 2,
        require: true,
    },
    lastName: {
        type: String,
        minLength: 2,
        require: true
    },
    username: {
        type: String,
        unique: true,
        minLength: 6,
        maxLength: 24,
        match: /^[a-zA-Z0-9]+$/,
        require: true,
    },
    email: {
        type: String,
        minLength: 8,
        require: true
    },
    password: {
        type: String,
        minLength: 8,
        require: true,
    },
    avatar: {
        type: String,
    },
    role: {
        type: String,
        require: true,
        default: 'artist'
    },
    upload: [{
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Artwork'
    }]
})

module.exports = mongoose.model('Artist', artistSchema);