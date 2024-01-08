const mongoose = require('mongoose');

const savelistSchema = new mongoose.Schema({
    artworks: [{
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Artwork-Test'
    }],
})

module.exports = mongoose.model('Savelist', savelistSchema);