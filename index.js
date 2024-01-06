const express = require('express');
const app = express();
const mongoose = require('mongoose');
const { vistitorRegister, artistRegister } = require('./functions/authRegister');
const mongoURL = 'mongodb+srv://s3975831:khai0123456@museumdb.wgffvrk.mongodb.net/?retryWrites=true&w=majority';
const PORT = 3000;

const session = require('express-session');
const { authLogin } = require('./functions/authLogin');
const Visitor = require('./models/vistitor'); // Correct the model import

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
    cookie:{
        secure: false, // set false to use the cookie on http not https
        httpOnly: true // for more secure factor
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
})

app.get('/register/visitor', (req, res) => {
    res.render('registeringpage/registertest');
})

app.post('/register/visitor', vistitorRegister, (req,res) => {
    console.log("Register visitor route end")
    res.send('Home')
})

app.post('/register/artist', artistRegister, (req,res) => {
    console.log("Register artist route end")
    res.redirect('/')
})

app.post('/login', async (req, res) => {
    const user = await authLogin(req)
    .then((eUser) => { return eUser })
    .catch((err) => { console.log('Falied to verfication')})
    if(user) {
        console.log('Route Login end with user: ')
        console.log(user)
    } else {
        console.log('Route Login end with no user')
    }
})

app.get('/all', (req, res) => {
    res.render('allartworkpage/allartwork');
})
  
app.get('/about', (req, res) => {
    res.render('aboutuspage/aboutus');
})

app.get('/profilepage', (req, res) => {
    const vistitor = new Visitor ({
        username: 'John Doe', 
        email: 'john@example.com', 
    });

    // Pass the vistitorData object to the rendering of the sidebar template
    res.render('profilepage/profilepage', { vistitor});
});

app.get('/sidebar' ,(req,res) => {
    res.render('allartworkpage/sidebar')
})

app.get('/dashboard', (req, res) => {
    res.render('dashboard/profileVisitor')
})

app.listen(PORT, () => {
    console.log(`Listening to port: ${PORT}`);
});
