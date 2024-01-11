const user = require('../models/user');

// const visitorDashboard = async (req, res) => {
//     try {
//         const foundUser = await User.findOne({ _id: req.session.user.id });
//         if (foundUser) {
//             const userTemplate = {
//                 firstName: foundUser.firstName,
//                 lastName: foundUser.lastName,
//                 name: foundUser.username,
//                 email: foundUser.email
//             };
//             console.log(foundUser)
//             res.status(200).render('dashboard/profileVisitor', { user: req.session.user, userTemplate });
//         } else {
//             res.status(404).redirect('/error')
//         }
//     } catch (err) {
//         // Handle error
//         console.log(err)
//         res.status(500).redirect('/error')
//     }
// }

// const artistDashboard = async (req, res) => {
//     try {
//         const foundUser = await User.findOne({ _id: req.session.user.id });
//         if (foundUser) {
//             const userTemplate = {
//                 firstName: foundUser.firstName,
//                 lastName: foundUser.lastName,
//                 name: foundUser.username,
//                 email: foundUser.email
//             };
//             console.log(foundUser)
//             res.status(200).render('dashboard/profileArtist', { user: req.session.user, userTemplate });
//         } else {
//             res.status(404).redirect('/error')
//         }
//     } catch (err) {
//         // Handle error
//         console.log(err)
//         res.status(500).redirect('/error')
//     }
// }

// const adminDashboard = async (req, res) => {
//     try {
//         const foundUser = await User.findOne({ _id: req.session.user.id });
//         if (foundUser) {
//             const userTemplate = {
//                 firstName: foundUser.firstName,
//                 lastName: foundUser.lastName,
//                 name: foundUser.username,
//                 email: foundUser.email
//             };
//             console.log(foundUser)
//             res.status(200).render('dashboard/profileAdmin', { user: req.session.user, userTemplate });
//         } else {
//             res.status(404).redirect('/error')
//         }
//     } catch (err) {
//         // Handle error
//         console.log(err)
//         res.status(500).redirect('/error')
//     }
// }

const getArtworks = async (req, res, next) => {
    try {
        const foundUpload = await user.findById(req.session.user.id).populate('uploads');
        if (!foundUpload) {
            return res.status(404).redirect('/error');
        } else {
            res.send("hello")
            console.log(foundUpload)
            res.render('dashboard/artworkArtist', { foundUpload: foundUpload, user: req.session.user });
        }
    } catch (err) {
        console.log("Error whule get uploaded artwork",err)
        res.status(500).redirect('/error');
    }
}

const getBookmarks = async (req, res, next) => {
    try {
        const foundListBookmark = await user.findById(req.session.user.id).populate({
            path: 'savedLists',
            populate: {
                path: 'artworks',
                model: 'Artwork'
            }
        });
        
        const foundBookmark = foundListBookmark.savedLists[0].artworks
        
        if (!foundBookmark) {
            return res.status(404).redirect('/error');
        } else {
            res.send("hello")
            console.log(foundBookmark)
            res.render('dashboard/bookmarkVisitor', { foundBookmark: foundBookmark, user: req.session.user });
        }
    } catch (err) {
        console.log("Error while get boomarked artwork",err)
        res.status(500).redirect('/error');
    }
}

module.exports = {
    // visitorDashboard,
    // artistDashboard,
    // adminDashboard,
    getArtworks,
    getBookmarks
};