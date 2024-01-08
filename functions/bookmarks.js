const savelist = require("../models/savelist")
const user = require("../models/user")

const bookmarks = async (req, res, next) => {
    try {
        const id = req.params.id

        const userLogged = await user.findOne({_id : req.session.user.id});

        const existedList = await savelist.findOne({_id: userLogged.savedLists[0]})

        if(existedList.artworks.includes(id)) {
            existedList.artworks = existedList.artworks.filter((awID) => {awID !== id})
        } else {
            existedList.artworks.push(id)
        }

        await existedList.save()

        console.log(await existedList.populate("artworks"))

        res.status(200).redirect(`/detail/${id}`)
        next()
    } catch (err) {
        console.log("Error while bookmarking: ", err)
        res.status(401).redirect("/error")
        next()
    }
}

module.exports = {
    bookmarks
}

