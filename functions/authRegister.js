const Artist = require('../models/artist');
const Visitor = require('../models/vistitor');
const bcrypt = require('bcrypt');

const vistitorRegister = async (req, res, next) => {
    const hashedPassword = await bcrypt.hash(req.body.password, 10); //Encrypted the password

    try {
        const data = {
            username: req.body.username,
            password: hashedPassword,
            email: req.body.email,
        }
        console.log(data)

        await Visitor.create(data)                                    //Create a new visitor
        .then(() => {
            console.log("Create a visitor successfully")
            next()
        })
        .catch((e) => {
            console.log("Error while creating a new visitor")
            throw e
        })
    } catch(e) {
        console.log('Cannot get the visitor data fromn the body')
    }
        
}

const artistRegister = async (req, res, next) => {
    const hashedPassword = await bcrypt.hash(req.body.password, 10);
    
    try {
        const data = {
            firstname: req.body.firstname,
            lastname: req.body.lastname,
            username: req.body.username,
            password: hashedPassword,
            email: req.body.email,
            image: req.body.image
        }

        await Artist.create(data)
        .then(() => {
            console.log("Create a visitor successfully")
            next()
        })
        .catch((e) => {
            console.log("Error while creating a new visitor")
            throw e
        })
    } catch (e) {
        console.log('Cannot get the artist data from the body')
        throw e
    }   
}

module.exports = {
    vistitorRegister,
    artistRegister,
}