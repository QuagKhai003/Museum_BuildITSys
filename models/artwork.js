const mongoose = require('mongoose');

const artworkSchema = mongoose.Schema({
    name: {
        type: String,
        require: true,
    },
    author: {
        type: String,
        require: true
    },
    info: {
        type: String,
        require: true,
    },
    img: {
        type: String,
        require: true
    },
    createAt: {
        type: Date,
        default: Date.now
    }
})

module.exports = mongoose.model('Artwork', artworkSchema);