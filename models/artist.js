const mongoose = require('mongoose');

const artistSchema = mongoose.Schema({
    firstName: {
        type: String,
        require: true,
    },
    lastName: {
        type: String,
        require: true
    },
    username: {
        type: String,
        require: true,
    },
    email: {
        type: String,
        require: true
    },
    password: {
        type: String,
        require: true,
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