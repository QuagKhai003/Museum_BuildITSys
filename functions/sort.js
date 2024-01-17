const User = require('../models/user');
const Artwork = require('../models/artwork')

const sortPending = async (req, res) => {
    try {
        const foundUser = await User.findById(req.session.user.id).populate('uploads');
        if (!foundUser) {
            return res.status(404).send('User not found');
        }
        const pendingArtworks = foundUser.uploads.filter(artwork => artwork.status === 'pending');
        pendingArtworks.reverse();
        res.render('dashboard/artworkArtist', { foundUpload: pendingArtworks, user: req.session.user });
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
        approvedArtworks.reverse();
        res.render('dashboard/artworkArtist', { foundUpload: approvedArtworks, user: req.session.user });
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
        declinedArtworks.reverse();
        res.render('dashboard/artworkArtist', { foundUpload: declinedArtworks, user: req.session.user });
    } catch (err) {
        res.status(500).redirect('error');
    }
}

module.exports = { sortPending, sortApproved, sortDeclined }