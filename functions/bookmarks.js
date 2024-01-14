const artwork = require("../models/artwork")
const savelist = require("../models/savelist")
const user = require("../models/user")

const bookmarks = async (req, res, next) => {
    try {
        const id = req.params.id

        const foundAW = await artwork.findById({_id: id})

        const userLogged = await user.findOne({_id : req.session.user.id});

        const existedList = await savelist.findOne({_id: userLogged.savedLists[0]})
        
        if( req.session.user.role == "visitor") {
            console.log('role')
            if(existedList.artworks.includes(id)) {
                existedList.artworks = existedList.artworks.filter((awID) => awID !== id); // Fix is here
                console.log('remove')
                console.log(existedList.artworks)
            } else {
                existedList.artworks.push(id)
                console.log(existedList.artworks)
            }

            await existedList.save()

            res.status(200).redirect(`/browsing/${foundAW.category}/${foundAW._id}`)
            next()
        } else {
            console.log("You cant not do this")
            res.status(200).redirect(`/browsing/${foundAW.category}/${foundAW._id}`)
            next()
        }
        
    } catch (err) {
        console.log("Error while bookmarking: ", err)
        res.status(500).redirect("/error")
        next()
    }
}

module.exports = {
    bookmarks
}

