const user = require('../models/user');
const bcrypt = require('bcrypt');

const visitorRegister = async (req, res, next) => {
    try {
        const hashedPassword = await bcrypt.hash(req.body.password, 10)

        const data = {
            firstName: req.body.firstName,
            lastName: req.body.lastName,
            username: req.body.username,
            password: hashedPassword,
            email: req.body.email,
            role: 'visitor',
        }

        const newUser = await user.create(data)
        console.log("Visitor created successfully:", newUser);
        
        req.session.user = {        //Attach user info with found data
            id: newUser._id.toString(),
            name: newUser.username,
            role: newUser.role
        }

        res.status(200).redirect('/')
        next()

    } catch (err) {
        console.log("Error while creating a new visitor", err);
        res.status(400).redirect("/register")
        next()
    }
}

const artistRegister = async (req, res, next) => {
    try {
        const hashedPassword = await bcrypt.hash(req.body.password, 10)

        const data = {
            firstName: req.body.firstName,
            lastName: req.body.lastName,
            username: req.body.username,
            password: hashedPassword,
            email: req.body.email,
            role: 'artist',
        }

        const newUser = await user.create(data)

        console.log("Artist created successfully:", newUser);
        
        req.session.user = {        //Attach user info with found data
            id: newUser._id.toString(),
            name: newUser.username,
            role: newUser.role
        }

        res.status(200).redirect('/')
        next()

    } catch (err) {
        console.log("Error while creating a new artist", err);
        res.status(400).redirect("/register")
        next()
    }
}


module.exports = {
    visitorRegister,
    artistRegister
}