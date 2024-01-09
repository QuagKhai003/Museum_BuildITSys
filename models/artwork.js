const mongoose = require('mongoose');

const artworkSchema = mongoose.Schema({
    artworkName: {
        type: String,
        require: true,
    },
    artworkDescription: {
        type: String,
        require: true,
    },
    author: {
        type: String,
        require: true
    },
    img: {
        type: String,
        require: true
    },
    status: {
        type: String,
        default: 'Pending'
    },
    categories: {
        type: String,
        enum: ['painting', 'fresco', 'sculpture']
    },
    createAt: {
        type: Date,
        default: Date.now
    }
})

module.exports = mongoose.model('Artwork', artworkSchema);