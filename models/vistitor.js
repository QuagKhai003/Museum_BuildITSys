const mongoose = require('mongoose');

const visitorSchema = mongoose.Schema({
    name: {
        type: String,
        require: true,
    },
    gmail: {
        type: String,
        require: true
    },
    password: {
        type: String,
        require: true,
    },
    role: {
        type: String,
        require: true,
    }
})