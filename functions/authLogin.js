const Visitor = require("../models/vistitor");
const Artist = require("../models/artist");
const bcrypt = require("bcrypt");
const { checkExisted } = require("./checkExist");

const authLogin = async(req, res, next) => {
    // const existedV = await Visitor.findOne({ username: req.body.username })
    // .then((user) => { return user })
    // .catch((err) => { console.log('Can not find an existed visitor')})

    // const existedA = await Artist.findOne({ username: req.body.username })
    // .then((user) => { return user })
    // .catch((err) => { console.log('Can not find an existed Artist')})

    // if (existedA || existedV) {
    //     const user = existedA || existedV;
    //     console.log(req.body.password)
    //     console.log(user.password)
    //     if (bcrypt.compareSync(req.body.password, user.password)) {
    //         return user
    //     } else {
    //         console.log('Wrong username or password')
    //         return null
    //     }
    // } else {
    //     console.log('The user is not existed')
    //     return null
    // }

    const existedU = await checkExisted(req)
    .then((user) => { return user })
    .catch((err) => {
        console.log('User doesnt exist')
    })

    if(existedU) {
        if (bcrypt.compareSync(req.body.password, existedU.password)) {
            return existedU
        }
        else {
            console.log('Wrong username or password')
            return null
        }
    } else {
        console.log('User not found')
        return null
    }
}

module.exports = {
    authLogin
}