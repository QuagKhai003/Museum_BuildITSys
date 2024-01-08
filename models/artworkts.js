const mongoose = require('mongoose');

const artworkTestSchema = mongoose.Schema({
    artworkName: {
        type: String,
        unique: true,
        require: true,
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

module.exports = mongoose.model('Artwork-Test', artworkTestSchema);