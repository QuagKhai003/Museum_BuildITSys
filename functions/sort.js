const User = require('../models/user');
const Artwork = require('../models/artwork')

const sortPending = async (req, res) => {
    try {
        const foundUser = await User.findById(req.session.user.id).populate('uploads');
        if (!foundUser) {
            return res.status(404).send('User not found');
        }
        const pendingArtworks = foundUser.uploads.filter(artwork => artwork.status === 'pending');
        res.render('dashboard/artworkArtist', { images: pendingArtworks, user: req.session.user });
    } catch (err) {
        res.status(500).redirect('error');
    }
}

const sortApproved = async (req, res) => {
    try {
        const foundUser = await User.findById(req.session.user.id).populate('uploads');
        if (!foundUser) {
            return res.status(404).send('User not found');
        }
        const approvedArtworks = foundUser.uploads.filter(artwork => artwork.status === 'approve');
        res.render('dashboard/artworkArtist', { images: approvedArtworks, user: req.session.user });
    } catch (err) {
        res.status(500).redirect('error');
    }
}

const sortDeclined = async (req, res) => {
    try {
        const foundUser = await User.findById(req.session.user.id).populate('uploads');
        if (!foundUser) {
            return res.status(404).send('User not found');
        }
        const declinedArtworks = foundUser.uploads.filter(artwork => artwork.status === 'decline');
        res.render('dashboard/artworkArtist', { images: declinedArtworks, user: req.session.user });
    } catch (err) {
        res.status(500).redirect('error');
    }
}

module.exports = { sortPending, sortApproved, sortDeclined }