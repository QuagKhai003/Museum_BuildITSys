const mongoose = require('mongoose');
const Artist = require('./artist');

const visitorSchema = mongoose.Schema({
    username: {
        type: String,
        unique:true,
        minLength: 6,
        maxLength: 24,
        match: /^[a-zA-Z0-9]+$/,
        require: true,
        // validate: {
        //     validator: async (value) => {
        //         const existedArtist = await Artist.findOne({username: value});
        //         if (existedArtist) {
        //             return {message: 'This username is already existed'}
        //         } else return {message: 'Visitor username is OK'}
        //     }
        // }
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
    role: {
        type: String,
        require: true,
        default: 'visitor'
    },
    bookmarks: [{
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Savelist'
    }]
})

module.exports = mongoose.model('Visitor', visitorSchema);