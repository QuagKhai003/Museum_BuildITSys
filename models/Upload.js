const express = require('express');
const app = express();
const mongoose = require('mongoose');
// MongoDB of this project
mongoose.connect('mongodb+srv://s3975831:khai0123456@museumdb.wgffvrk.mongodb.net/?retryWrites=true&w=majority')
.then(() => console.log('Connected to MongoDB Atlas'))
.catch((error) => console.log(error.message));

// Define Schema
const uploadSchema = new mongoose.Schema ({
    artworkName: {type: String, required: true},
    artworkArtist: {type: String, required: true},
    date: {type: Date, required: true},
    artworkThemes: {type: String, required: true},
    artworkDescription: {type: String, required: true},
    image: {
        type: String,
        required: true
    },
});

const Upload = mongoose.model('Upload', uploadSchema);
module.exports = { Upload };