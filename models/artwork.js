const mongoose = require('mongoose')
// Define Schema
const artworkSchema = new mongoose.Schema ({
    artworkName: {
        type: String, 
        required: true
    },
    artworkArtist: {
        type: String, 
        required: true
    },
    category: {
        type: String, 
        required: true
    },
    artworkDescription: {
        type: String, 
        required: true
    },
    image: {
        type: String,
        required: true
    },
    createAt: {
        type: Date,
        default: Date.now()
    },
    status: {
        type: String,
        default: "pending",
        enum: ["approve", "decline", "pending"]
    }
});

module.exports = mongoose.model('Artwork', artworkSchema);