const user = require('../models/user');
const bcrypt = require('bcrypt');

const visitorTestRegister = async (req, res, next) => {
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

        console.log(data)

        const newUser = await user.create(data)

        console.log("Visitor created successfully:", newUser);
        return { message: 'Visitor created successfully', user : newUser};

    } catch (err) {
        console.error("Error while creating a new visitor", err);
        return { message: 'Duplicate username or system failed', user: null };
    }
}

const artistTestRegister = async (req, res, next) => {
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

        console.log(data)

        const newUser = await user.create(data)

        console.log("Artist created successfully:", newUser);
        return { message: 'Artist created successfully', user : newUser};

    } catch (err) {
        console.error("Error while creating a new artist", err);
        return { message: 'Duplicate username or system failed', user: null };
    }
}


module.exports = {
    visitorTestRegister,
    artistTestRegister
}