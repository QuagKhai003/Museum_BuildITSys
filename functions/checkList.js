const savelist = require("../models/savelist")
const user = require("../models/user")

const checkExistedList = async ( req, res, next ) => {
    try {
        const userLogged = await user.findOne({_id: req.session.user.id})

        console.log(userLogged.savedLists.length)

        if (userLogged.savedLists.length === 0 && req.session.user.role == "visitor") {
            const list = await savelist.create({ nameList: "all"})
            await userLogged.savedLists.push(list._id)
            await userLogged.save()
            console.log("List all created")
            next()
        } else {
            console.log("No permission")
        }
        next()
    } catch (err) {
        console.log("Error while checking saved lists", err)
        res.status(500).redirect('/error')
    }
}

module.exports = {
    checkExistedList,
}