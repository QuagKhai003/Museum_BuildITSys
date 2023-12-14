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
    bookmarks: [{
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Savelist'
    }],
    upload: [{
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Artwork'
    }]
})

module.exports = mongoose.model('Artist', artistSchema);