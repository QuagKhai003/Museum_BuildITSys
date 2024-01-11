const express = require('express');
const app = express();
const mongoose = require('mongoose');
const path = require('path');
const mongoURL = 'mongodb+srv://s3975831:khai0123456@museumdb.wgffvrk.mongodb.net/?retryWrites=true&w=majority';
const PORT = 3000;
const multer = require('multer');
const session = require('express-session');
const { visitorRegister, artistRegister } = require('./functions/authRegister');
const { authLogin } = require('./functions/authLogin');
const { checkExistedList } = require('./functions/checkList');
const { bookmarks } = require('./functions/bookmarks');
const { getProfile, getEditProfile, getChangePassword, postEditProfile, postChangePassword } = require('./functions/userEdit');
const { uploadArtworks, upload, uploadAva } = require('./functions/uploadArtworks');
const { changePw } = require('./functions/changePw');
const { getArtworks, getBookmarks } = require('./functions/getDashboard');
const { sortPending, sortApproved, sortDeclined } = require('./functions/sort');
const user = require('./models/user');
const artwork = require('./models/artwork');

app.set('view engine', 'ejs');
app.use(express.static('public'));
app.use(express.urlencoded({ extended: true }));
app.use(express.json());

mongoose.connect(mongoURL)
    .then(() => console.log('Database Connection Sucessfull!'))
    .catch((error) => console.log(error.message));

app.use(session({
    secret: 'secret-key-team02-BIT',
    resave: false,
    saveUninitialized: true,
    cookie: {
        secure: false, // set false to use the cookie on http not https
        httpOnly: true // for more secure factor
    }
}));

app.get('/', (req, res) => {
    console.log(req.session.user)
    res.render('homepage/homepage', { user: req.session.user });
});

app.get('/login', (req, res) => {
    res.render('loginpage/login');
});

app.get('/register', (req, res) => {
    res.render('registeringpage/register');
})

app.post('/register/visitor/', visitorRegister, (req, res) => {
    console.log(req.session.user)
    console.log("Visitor register route end")
})

app.post('/register/artist/', artistRegister, async (req, res) => {
    console.log(req.session.user)
    console.log("Artist register route end")
})

app.post('/login', authLogin, (req, res) => {
    console.log(req.session.user)
    console.log("Login route end")
})

app.get('/about', (req, res) => {
    res.render('aboutuspage/aboutus', {user: req.session.user});
})

// app.get('/dashboardVisitor', visitorDashboard)
// app.get('/dashboardArtist', artistDashboard)
// app.get('/dashboardAdmin', adminDashboard)

// app.get('/edit', (req, res) => {
//     res.render('dashboard/edit', { user: req.session.user })
// })

// app.get('/editArtist', (req, res) => {
//     res.render('dashboard/editArtist')
// })


// app.get('/editAdmin' ,(req, res) => {
//     res.render('dashboard/editAdmin', {user: req.session.user})
// })

// app.get('/editArtist', (req, res) => {
//     res.render('dashboard/editArtist')
// })

// app.get('/password', (req, res) => {
//     req.session.user
//     console.log(req.session.user)
//     if (req.session.user) {
//         res.render('dashboard/password', { user: req.session.user });
//     } else {
//         res.redirect('/error')
//     }
// })

// app.post('/changePassword', changePw);

// app.get('/passwordArtist', (req, res) => {
//     res.render('dashboard/passwordArtist')
// })

// app.get('/passwordAdmin', (req, res) => {
//     res.render('dashboard/passwordAdmin')
// })

// app.get('/dashUser', (req, res) => {
//     res.render('dashboardpage/user');
// })

// app.get('/dashArtist', (req, res) => {
//     res.render('dashboardpage/artist');
// })

// app.get('/dashAdmin', (req, res) => {
//     res.render('dashboardpage/admin');
// })

// app.get('/dashboard', (req, res) => {
//     res.render('dashboardpage/adminTest.ejs')
// })

app.get('/artworkArtist/pending', sortPending)
app.get('/artworkArtist/approved', sortApproved)
app.get('/artworkArtist/declined', sortDeclined)

app.get('/detailedpage', (req, res) => {
    res.render('detailedpage/detailedpage.ejs', {user: req.session.user})
})

app.get('/error', (req, res) => {
    res.render('errorpage/errorpage.ejs', { user: req.session.user })
})

app.listen(PORT, () => {
    console.log(`Listening to port: ${PORT}`);
});

app.get('/browsing', async(req, res) => {
    const foundAW = await artwork.find({});
    res.render('browsingpage/allcategories', {foundAW: foundAW, user: req.session.user});
})

app.get('/browsing/all', async(req, res) => {
    const foundAW = await artwork.find({});
    console.log(foundAW)
    res.render('browsingpage/browsingartwork', {foundAW: foundAW, user: req.session.user});
})

app.get('/browsing/painting', async(req, res) => {
    const foundAW = await artwork.find({categories: 'painting'});
    res.render('browsingpage/browsingartwork', {foundAW: foundAW, user: req.session.user});
})

app.get('/browsing/painting/:id', async(req, res) => {
    const foundAW = await artwork.findOne({_id: req.params.id});
    res.render('detailedpage/detailedpage.ejs', {foundAW: foundAW, user: req.session.user});
})

app.get('/browsing/sculpture', async(req, res) => {
    const foundAW = await artwork.find({categories: 'sculpture'});
    res.render('browsingpage/browsingartwork', {foundAW: foundAW, user: req.session.user});
})

app.get('/browsing/sculpture/:id', async(req, res) => {
    const foundAW = await artwork.findOne({_id: req.params.id});
    res.render('browsingpage/detailedpage.ejs', {foundAW: foundAW, user: req.session.user});
})

app.get('/browsing/fresco', async(req, res) => {
    const foundAW = await artwork.find({categories: 'fresco'});
    res.render('browsingpage/browsingartwork', {foundAW: foundAW, user: req.session.user});
})

app.get('/browsing/fresco/:id', async(req, res) => {
    const foundAW = await artwork.findOne({_id: req.params.id});
    res.render('browsingpage/detailedpage.ejs', {foundAW: foundAW, user: req.session.user});
})

app.post('/bookmark/:id/', checkExistedList, bookmarks, async(req, res) => {
    console.log("bookmark route end")
})

app.post('/profile/pending/:id/approve', async( req, res) => {
    try {
        const foundAW = await artwork.findById(req.params.id)

        foundAW.status = 'approve';

        await foundAW.save()

        res.status(200).redirect("/profile/pending")
    } catch(err) {
        console.log("Error while approving")
        res.status(500).redirect('/profile/pending')
    }
})

app.post('/profile/pending/:id/decline', async( req, res) => {
    try {
        const foundAW = await artwork.findById(req.params.id)

        foundAW.status = 'decline';

        await foundAW.save()

        res.status(200).redirect("/profile/pending")
    } catch(err) {
        console.log("Error while declining")
        res.status(500).redirect('/profile/pending')
    }
})

app.get('/upload', (req, res) => {
    res.render('uploadpage/upload', { user: req.session.user });
})

app.get('/profile', getProfile);

app.get('/profile/edit', getEditProfile);

app.post('/profile/edit', uploadAva.single('avatar'), postEditProfile);

app.get('/profile/password', getChangePassword);

app.post('/profile/password', postChangePassword);

app.get('/profile/artwork', getArtworks)

app.get('/profile/bookmark', getBookmarks)

app.get('/profile/pending', async (req, res) => {
    const foundAW = await artwork.find({})
    res.render('dashboard/PendingAdmin', {foundAW: foundAW, user: req.session.user})
})
      
app.post('/upload', upload.single('image'), uploadArtworks);

app.get('/logout', async (req, res) => {
    req.session.destroy((err) => {
        if (err) {
            console.log(err);
        } else {
            res.redirect('/');
        }
    });
})
