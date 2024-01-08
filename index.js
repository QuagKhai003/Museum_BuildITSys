const express = require('express');
const app = express();
const mongoose = require('mongoose');
const mongoURL = 'mongodb+srv://s3975831:khai0123456@museumdb.wgffvrk.mongodb.net/?retryWrites=true&w=majority';
const PORT = 3000;


const session = require('express-session');
const { visitorRegister, artistRegister } = require('./functions/authRegister');
const { visitorTestRegister, artistTestRegister } = require('./functions/authRegisterTest');
const { authLogin } = require('./functions/authLogin');
const vistitor = require('./models/vistitor');
const artworkts = require('./models/artworkts');

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

app.get('/profilepage', async (req, res) => {
    try {
      const currentVisitorId = req.session.visitorId; 
  
      const currentVisitor = await vistitor.findById(currentVisitorId);
  
      res.render('profilepage/profilepage', { vistitor: currentVisitor });
    } catch (error) {
      console.error('Error fetching visitor data:', error);
      res.send('Internal Server Error');
    }
});
  
app.post('/register/visitor', visitorRegister, (req,res) => {
    console.log("Register visitor route end")
    res.send('Home')
})

app.post('/register/artist', artistRegister, (req,res) => {
    console.log("Register artist route end")
    res.redirect('/')
})

app.post('/register/visitor/test', async (req,res) => {
    try {
        const result = await visitorTestRegister(req)
        
        if (!result.user) {
            // Handle error response
            console.log(result.message)
            res.redirect('/error');
        } else {
            // Handle success response
            console.log(result.message)
            res.redirect('/');
        }
        console.log("Visitor registration route end")
    } catch (err) {
        console.error("Error in visitor registration route:", err);
        res.status(500).json({ error: 'Internal server error' });
    }
})

app.post('/register/artist/test', async (req,res) => {
    try {
        const result = await artistTestRegister(req)
        
        if (!result.user) {
            // Handle error response
            console.log(result.message)
            res.redirect('/error');
        } else {
            // Handle success response
            console.log(result.message)
            res.redirect('/');
        }
        console.log("Artist registration route end")
    } catch (err) {
        console.error("Error in artist registration route:", err);
        res.status(500).json({ error: 'Internal server error' });
    }
})

app.post('/login', async (req, res) => {
    const user = await authLogin(req)
    .then((eUser) => { return eUser })
    .catch((err) => { console.log('Falied to verfication')})
    if(user) {
        console.log('Route Login end with user: ')
        console.log(user)
        res.redirect('/')
    } else {
        console.log('Route Login end with no user')
        res.status(404).json({error: "Incorrect password or username"})
    }
})

app.get('/all', (req, res) => {
    res.render('allartworkpage/allartwork');
})
  
app.get('/about', (req, res) => {
    res.render('aboutuspage/aboutus');
})

app.get('/dashUser', (req, res) => {
    res.render('dashboardpage/user');
})

app.get('/dashArtist', (req, res) => {
    res.render('dashboardpage/artist');
})

app.get('/dashAdmin', (req, res) => {
    res.render('dashboardpage/admin');
})

app.get('/dashboard', (req, res) => {
    res.render('dashboardpage/adminTest.ejs')
})


app.listen(PORT, () => {
    console.log(`Listening to port: ${PORT}`);
});

app.get('/edit-profile', (req, res) => {
    res.render('profilepage/edit-profile');
});

app.post('/edit-profile', async (req, res) => {
    try {
      // Assuming you have a form with fields like username, email, etc.
      const { username, email } = req.body;
  
      // Assuming you have a visitor's ID (replace 'visitorId' with the actual field name)
      const vistitorId = req.body.visitorId;
  
      // Update the visitor's data in the database
      const updatedVisitor = await vistitor.findByIdAndUpdate(vistitorId, { username, email }, { new: true });
  
      res.redirect('/profilepage');
    } catch (error) {
      console.error('Error updating visitor profile:', error);
      res.status(500).json({ success: false, message: 'Error updating profile' });
    }
});

app.get('/browsing/all', async(req, res) => {
    res.render('allpage/allcategories');
})

app.post('/upload', async (req, res) => {
    const newAW = {
        artworkName: "Testing 1",
        categories: "painting",
    }

    await artworkts.create(newAW)
})

app.get('/allartworktest', async (req, res) => {
    const allAW = await artworkts.find({})
    res.render('allpage/allartworkpagefortest', {allAW: allAW})
})