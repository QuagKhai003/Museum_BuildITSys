const mongoose = require('mongoose');

const userSchema = mongoose.Schema({
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
        unique:true,
        minLength: 6,
        maxLength: 24,
        match: /^[a-zA-Z0-9]+$/,
        require: true,
    },
    password: {
        type: String,
        minLength: 8,
        require: true,
    },
    email: {
        type: String,
        minLength: 8,
        require: true
    },
    avatar: {
        type: String,
        default: 'default.jpg'
    },
    role: {
        type: String,
        enum: ['visitor', 'artist', 'admin'],
        require: true
    },
    uploads: [{
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Artwork'
    }],
    savedLists: [{
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Savelist'
    }]
})

module.exports = mongoose.model('User', userSchema);