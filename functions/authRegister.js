const Artist = require('../models/artist');
const Visitor = require('../models/visitor');
const bcrypt = require('bcrypt');
const { checkExisted } = require('./checkExist');

const visitorRegister = async (req, res, next) => {
    const hashedPassword = await bcrypt.hash(req.body.password, 10)
        .then((hash) => { return hash })
        .catch(((err) => { console.log('Cannot hash password') })); //Encrypted the password

    const existedU = await checkExisted(req)

    if (!existedU) {
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
    }
    else {
        console.log('Please register with another account')
        return null
    }
}

const artistRegister = async (req, res, next) => {
    const hashedPassword = await bcrypt.hash(req.body.password, 10)
        .then((hash) => { return hash })
        .catch(((err) => { console.log('Cannot hash password') })); //Encrypted the password

    const existedU = await checkExisted(req)
        .then((user) => { return user })
        .catch((err) => {
            console.log('User doesnt exist')
        })

    if (!existedU) {
        const data = {
            firstname: req.body.firstname,
            lastname: req.body.lastname,
            username: req.body.username,
            password: hashedPassword,
            email: req.body.email,
        }

        console.log(data)

        await Artist.create(data)
            .then(() => {
                console.log("Create a artist successfully")
                next()
            })
            .catch((e) => {
                console.log("Error while creating a new artist")
                throw e
            })
    } else {
        console.log('Please register with another account')
        return null
    }
}

module.exports = {
    visitorRegister,
    artistRegister,
}