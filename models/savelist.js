const mongoose = require('mongoose');

const savelistSchema = new mongoose.Schema({
    artworks: [{
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Artwork'
    }],
    count: {
        type: Number,
        require: true
    },
})

module.exports = mongoose.model('Savelist', savelistSchema);