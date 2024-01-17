const artist = require("../models/artist")
const vistitor = require("../models/vistitor")

const getVisitorModel = () => {
    return vistitor
}

const getArtistModel = () => {
    return artist
}

module.exports = {
    getVisitorModel,
    getArtistModel,
}