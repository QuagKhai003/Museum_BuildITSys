const express = require('express');
const app = express();
const mongoose = require('mongoose');
const mongoURL = 'mongodb+srv://s3975831:khai0123456@museumdb.wgffvrk.mongodb.net/?retryWrites=true&w=majority';
const PORT = 3000;


const session = require('express-session');
const { visitorRegister, artistRegister } = require('./functions/authRegister');
const { authLogin } = require('./functions/authLogin');
const Visitor = require('./models/vistitor'); // Correct the model import
const vistitor = require('./models/vistitor');
const artworkts = require('./models/artworkts');
const { checkExistedList } = require('./functions/checkList');
const { bookmarks } = require('./functions/bookmarks');

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
    req.session.user
    console.log(req.session.user)
    res.render('homepage/homepage', {user: req.session.user});
});

app.get('/login', (req, res) => {
    res.render('loginpage/login');
});

app.get('/register', (req, res) => {
    res.render('registeringpage/register');
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

app.post('/register/visitor/', visitorRegister, (req,res) => {
    console.log(req.session.user)
    console.log("Visitor register route end")
})

app.post('/register/artist/', artistRegister, async (req,res) => {
    console.log(req.session.user)
    console.log("Artist register route end")
})

app.post('/login', authLogin, (req, res) => {
    console.log(req.session.user)
    console.log("Login route end")
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

app.get('/dashboardTest', (req, res) => {
    res.render('dashboard/dashboardTest')
})

app.get('/dashboardVisitor', (req, res) => {
    res.render('dashboard/profileVisitor', {user: req.session.user})
})

app.get('/dashboardArtist', (req, res) => {
    res.render('dashboard/profileArtist', {user: req.session.user})
})
app.get('/dashboardAdmin', (req, res) => {
    res.render('dashboard/profileAdmin', {user: req.session.user})
})

app.get('/edit' ,(req, res) => {
res.render('dashboard/edit')
})


app.get('/editArtist' ,(req, res) => {
    res.render('dashboard/editArtist')
})


app.get('/editAdmin' ,(req, res) => {
    res.render('dashboard/editAdmin')
})

app.get('/editArtist' ,(req,res) => {
    res.render('dashboard/editArtist')
})


app.get('/password' ,(req, res) => {
res.render('dashboard/password')
})

app.get('/passwordArtist' ,(req, res) => {
    res.render('dashboard/passwordArtist')
})

app.get('/passwordAdmin' ,(req, res) => {
    res.render('dashboard/passwordAdmin')
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

app.get('/error', (req, res) => {
    res.render('errorpage/errorpage.ejs')
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

app.get('/all', async(req, res) => {
    res.render('allpage/allcategories');
})

app.post('/upload', async (req, res) => {
    const newAW = {
        artworkName: req.body.name,
        categories: req.body.categories,
    }

    await artworkts.create(newAW)
    .then(() => {console.log("Create aw success")})
    .catch((err) => {console.log("Unable to create aw: ", err)})
})

app.post('/detail/:id/save', checkExistedList, bookmarks, async(req, res) => {
    console.log("bookmark route end")
})

app.get('/allartworktest', async (req, res) => {
    const allAW = await artworkts.find({})
    res.render('allpage/allartworkpagefortest', {allAW: allAW, user: req.session.user})
})

app.get('/detail/:id', async (req, res) => {
    const foundAW = await artworkts.find({ _id: req.params.id })
    res.render('allpage/detailpage', {foundAW: foundAW , user: req.session.user})
})

app.get('/logout', async(req, res) => {
    req.session.destroy((err) =>{
        if(err) {
           console.log(err);
        } else{
            res.redirect('/');
        }
     });
})