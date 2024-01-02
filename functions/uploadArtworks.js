const express = require('express');
const mongoose = require('mongoose');
const multer = require('multer');
const path = require('path');
const app = express();
const port = 3000;
const { Upload } = require('../models/Upload');

app.set('view engine', 'ejs');

// Serving static files from the 'public' directory
app.use('/public', express.static(path.join(__dirname, 'public')));

// Use the `express.urlencoded` middle ware to pass incoming form data
app.use(express.urlencoded({ extended: true}));

const storage = multer.diskStorage({
    destination: (req, file, cb) => {
        cb(null, 'Artworks')
    },

    filename: (req, file, cb) => {
        console.log(file)
        cb(null, Date.now() + path.extname(file.originalname))
    }
})

const upload = multer({storage: storage});

// Function to handle artwork upload
function uploadArtworks(req, res) {
    // Create a new Upload document using the model
    const artworkUpload = new Upload({
        artworkName: req.body.artworkName,
        artworkArtist: req.body.artworkArtist,
        date: req.body.date,
        artworkThemes: req.body.artworkThemes,
        artworkDescription: req.body.artworkDescription,
        image: req.file.filename,
    });

    // Save the document to MongoDB
    artworkUpload
        .save()
        .then(() => {
            res.send('Artwork Uploaded');
        })
        .catch((error) => {
            console.error(error);
            res.status(500).send('Internal Server Error');
        });
}

module.exports = { uploadArtworks };