const Visitor = require("../models/vistitor");
const Artist = require("../models/artist");
const bcrypt = require("bcrypt");

const authLogin = async(req, res, next) => {
    try {
        await Promise.any([
            Artist.findOne({ username: req.body.username }),
            Visitor.findOne({ username: req.body.username }),
        ]).then((user) => {
            console.log(req.body.username);
            if (user && bcrypt.compareSync(req.body.password, user.password)) {
                console.log('Dang nhap thanh cong')
                console.log('User: ' + user);
                return user;
            } else {
                console.log('Wrong username or password');
                next();
            }
        }).catch((err) => {
            console.log('User is null');
            console.log(err.message)
        })  
    } catch (err) {
        console.log('Cannot process verification:', err.message);
        throw err;
    }
}

module.exports = {
    authLogin
}