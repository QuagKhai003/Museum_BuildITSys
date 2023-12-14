const mongoose = require('mongoose');

const artistSchema = mongoose.Schema({
    artists: [{
        type: mongoose.Schema.Types.ObjectId,
        ref: 'User'
    }],
    count: {
        type: Number,
        require: true
    },
})

module.exports = mongoose.model('Artist', artistSchema);