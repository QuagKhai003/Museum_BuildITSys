const mongoose = require('mongoose');
const Artist = require('./artist');

const visitorSchema = mongoose.Schema({
    visitors: [{
        type: mongoose.Schema.Types.ObjectId,
        ref: 'User'
    }],
    count: {
        type: Number,
        require: true
    },
})

module.exports = mongoose.model('Visitor', visitorSchema);