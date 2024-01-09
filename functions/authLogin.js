const user = require("../models/user")
const bcrypt = require("bcrypt");

const authLogin = async(req, res, next) => {
    try {
        const ExistedUser = await user.findOne({username: req.body.username})

        if (bcrypt.compareSync(req.body.password, ExistedUser.password)) {
            req.session.user = {        
                id: ExistedUser._id.toString(),
                name: ExistedUser.username,
                role: ExistedUser.role
            }
            console.log('Login success')
            res.status(200).redirect('/')
        }
        else {
            console.log('Wrong username or password')
            res.status(401).redirect('/login')
        }
        next()  
    } catch (err) {
        console.log("Error while verfication: ", err);
        res.status(500).redirect('/error')
    }
}

module.exports = {
    authLogin
}