const User = require('../models/user');

const visitorDashboard = async (req, res) => {
    try {
        const foundUser = await User.findOne({ _id: req.session.user.id });
        if (foundUser) {
            const userTemplate = {
                firstName: foundUser.firstName,
                lastName: foundUser.lastName,
                name: foundUser.username,
                email: foundUser.email
            };
            console.log(foundUser)
            res.status(200).render('dashboard/profileVisitor', { user: req.session.user, userTemplate });
        } else {
            res.status(404).redirect('/error')
        }
    } catch (err) {
        // Handle error
        console.log(err)
        res.status(500).redirect('/error')
    }
}

const artistDashboard = async (req, res) => {
    try {
        const foundUser = await User.findOne({ _id: req.session.user.id });
        if (foundUser) {
            const userTemplate = {
                firstName: foundUser.firstName,
                lastName: foundUser.lastName,
                name: foundUser.username,
                email: foundUser.email
            };
            console.log(foundUser)
            res.status(200).render('dashboard/profileArtist', { user: req.session.user, userTemplate });
        } else {
            res.status(404).redirect('/error')
        }
    } catch (err) {
        // Handle error
        console.log(err)
        res.status(500).redirect('/error')
    }
}

const adminDashboard = async (req, res) => {
    try {
        const foundUser = await User.findOne({ _id: req.session.user.id });
        if (foundUser) {
            const userTemplate = {
                firstName: foundUser.firstName,
                lastName: foundUser.lastName,
                name: foundUser.username,
                email: foundUser.email
            };
            console.log(foundUser)
            res.status(200).render('dashboard/profileAdmin', { user: req.session.user, userTemplate });
        } else {
            res.status(404).redirect('/error')
        }
    } catch (err) {
        // Handle error
        console.log(err)
        res.status(500).redirect('/error')
    }
}

const artworkArtist = async (req, res) => {
    try {
        let foundUser = await User.findById(req.session.user.id).populate('uploads');
        if (!foundUser) {
            return res.status(404).send('User not found');
        }
        res.render('dashboard/artworkArtist', { images: foundUser.uploads, user: req.session.user });
    } catch (err) {
        console.log(err)
        res.status(500).redirect('error');
    }
    
}

module.exports = {
    visitorDashboard,
    artistDashboard,
    adminDashboard,
    artworkArtist
};