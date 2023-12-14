const Artist = require('../models/artist');
const Visitor = require('../models/vistitor');

const checkExisted = async (req) => {
    const existedV = await Visitor.findOne({ username: req.body.username })
    .then((user) => { return user })
    .catch((err) => { console.log('Can not find an existed visitor')})

    const existedA = await Artist.findOne({ username: req.body.username })
    .then((user) => { return user })
    .catch((err) => { console.log('Can not find an existed Artist')})

    if (existedA || existedV) {
        const user = existedA || existedV;
        return user
    } else {
        console.log('The user is not existed')
        return null
    }
}

module.exports = { checkExisted }