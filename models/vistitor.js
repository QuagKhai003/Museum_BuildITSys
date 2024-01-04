const mongoose = require('mongoose');
const Artist = require('./artist');
mongoose.connect('mongodb+srv://s3975831:khai0123456@museumdb.wgffvrk.mongodb.net/?retryWrites=true&w=majority')
const visitorSchema = mongoose.Schema({
    username: {
        type: String,
        unique: true,
        minLength: 6,
        maxLength: 24,
        match: /^[a-zA-Z0-9]+$/,
        required: true, // Corrected from "require" to "required"
    },
    email: {
        type: String,
        minLength: 8,
        required: true,
    },
    password: {
        type: String,
        minLength: 8,
        required: true,
    },
    role: {
        type: String,
        required: true,
        default: 'visitor',
    },
    bookmarks: [{
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Savelist',
    }],
    avatar: {
        type: String, 
    },
});

module.exports = mongoose.model('Visitor', visitorSchema);
