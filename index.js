const express = require('express');
const app = express();
const mongoose = require('mongoose');
const { visitorRegister, artistRegister } = require('./functions/authRegister');
const mongoURL = 'mongodb+srv://s3975831:khai0123456@museumdb.wgffvrk.mongodb.net/?retryWrites=true&w=majority';
const PORT = 3000;
const ObjectID = require('mongodb').ObjectID;

const session = require('express-session');
const { authLogin } = require('./functions/authLogin');
const visitor = require('./models/visitor');
const artist = require('./models/artist');

app.set('view engine', 'ejs');
app.use(express.static('public'));
app.use(express.urlencoded({ extended: true }));
app.use(express.json());

mongoose.connect(mongoURL)
    .then(() => console.log('Database Connection Successful!'))
    .catch((error) => console.log(error.message));

app.use(session({
    secret: 'secret-key-team02-BIT',
    resave: false,
    saveUninitialized: true,
    cookie: {
        secure: false,
        httpOnly: true
    }
}));

app.get('/', (req, res) => {
    res.render('homepage/homepage');
});

app.get('/login', (req, res) => {
    res.render('loginpage/login');
});

app.get('/register', (req, res) => {
    res.render('registeringpage/register');
});

app.get('/register/visitor', (req, res) => {
    res.render('registeringpage/registertest');
});

app.get('/profile/:id', async (req, res) => {
    const { id } = req.params;
    try {
        const foundVisitor = await visitor.findById(id);

        if (!foundVisitor) {
            const foundArtist = await artist.findById(id);
            if (!foundArtist) {
                return res.render('not_found', { errorMessage: 'User not found' });
            }
            res.render('profilepage/profilepage', { user: foundArtist, userId: foundArtist._id });
        } else {
            res.render('profilepage/profilepage', { user: foundVisitor, userId: foundVisitor._id });
        }
    } catch (error) {
        console.error(error);
        res.send(error.message);
    }
});

app.post('/register/visitor', visitorRegister, (req, res) => {
    console.log("Register visitor route end");
    res.send('Home');
});

app.post('/register/artist', artistRegister, (req, res) => {
    console.log("Register artist route end");
    res.redirect('/');
});

app.post('/login', async (req, res) => {
    try {
        const user = await authLogin(req);

        if (user) {
            console.log('Route Login end with user: ');
            console.log(user);
            res.redirect(`/profile/${user._id}`);
        } else {
            console.log('Route Login end with no user');
            res.status(404).json({ error: "Incorrect password or username" });
        }
    } catch (err) {
        console.log('Failed to verify:', err);
        res.status(500).json({ error: "Internal Server Error" });
    }
});


// Add this route before the /edit-profile POST route
app.get('/edit-profile/:id', async (req, res) => {
    const { id } = req.params; // Change '_id' to 'id'

    try {
        const foundVisitor = await visitor.findById(id);
        const foundArtist = await artist.findById(id);
        const user = foundVisitor || foundArtist;

        if (!user) {
            return res.render('not_found', { errorMessage: 'User not found' });
        }

        res.render('profilepage/edit-profile', { user });
    } catch (error) {
        console.error(error);
        res.status(500).json({ error: "Internal Server Error" });
    }
});

app.post('/edit-profile/:id', async (req, res) => {
    const { id } = req.params;

    try {
        const foundVisitor = await visitor.findById(id);
        const foundArtist = await artist.findById(id);
        const user = foundVisitor || foundArtist;

        if (!user) {
            return res.render('not_found', { errorMessage: 'User not found' });
        }

        // Update the user's profile based on the form data
        user.username = req.body.username;
        user.email = req.body.email;

        // Save the updated user profile
        await user.save();

        // Redirect to the user's profile page
        res.redirect(`/profile/${user._id}`);
    } catch (error) {
        console.error(error);
        res.status(500).json({ error: "Internal Server Error" });
    }
});



app.listen(PORT, () => {
    console.log(`Listening to port: ${PORT}`);
});
