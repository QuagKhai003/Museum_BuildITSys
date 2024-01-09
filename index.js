const express = require('express');
const app = express();
const mongoose = require('mongoose');
const mongoURL = 'mongodb+srv://s3975831:khai0123456@museumdb.wgffvrk.mongodb.net/?retryWrites=true&w=majority';
const PORT = 3000;
const multer = require('multer');

const session = require('express-session');
const { visitorRegister, artistRegister } = require('./functions/authRegister');
const { authLogin } = require('./functions/authLogin');
const User = require('./models/user'); 

const artworkts = require('./models/artworkts');
const { checkExistedList } = require('./functions/checkList');
const { bookmarks } = require('./functions/bookmarks');
const user = require('./models/user');

app.set('view engine', 'ejs');
app.use(express.static('public'));
app.use(express.urlencoded({ extended: true }));
app.use(express.json());
const storage = multer.diskStorage({
    destination: function (req, file, cb) {
      cb(null, 'public/images/uploads/'); 
    },
    filename: function (req, file, cb) {
      cb(null, Date.now() + path.extname(file.originalname));
    },
});

const upload = multer({ storage: storage });
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

app.get('/all', (req, res) => {
    res.render('allartworkpage/allartwork');
})
  
app.get('/about', (req, res) => {
    res.render('aboutuspage/aboutus');
})



app.get('/sidebar' ,(req,res) => {
    res.render('allartworkpage/sidebar')
})

app.get('/dashboardTest', (req, res) => {
    res.render('dashboard/dashboardTest')
})

app.get('/dashboardVisitor', (req, res) => {
    res.render('dashboard/profileVisitor')
})

app.get('/dashboardArtist', (req, res) => {
    res.render('dashboard/profileAritst')
})
app.get('/dashboardAdmin', (req, res) => {
    res.render('dashboard/profileAdmin')
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



app.get('/browsing/all', async(req, res) => {
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

app.get('/profile/:id', async (req, res) => {
    const { id } = req.params;
    try {
        const foundUser = await user.findById(id);
        if (!foundUser) {
            res.status(500).json({ error: "User not found" });
        }
        
        res.render('dashboard/profileVisitor', { user: foundUser });
        
    } catch (error) {
        console.error(error);
        res.send(error.message);
    }
});
// Add this route before the /edit-profile POST route
app.get('/edit-profile/:id', async (req, res) => {
    const { id } = req.params; 

    try {
        const foundUser = await user.findById(id)
        

        if (!user) {
            res.status(500).json({ error: "User not found" });
        }

        res.render('dashboard/edit', { user: foundUser });
    } catch (error) {
        console.error(error);
        res.status(500).json({ error: "Internal Server Error" });
    }
});

app.post('/edit-profile/:id', upload.single('avatar'), async (req, res) => {
    const { id } = req.params;
    

    try {
        const foundUser = await user.findById(id);
        

        if (!user) {
            res.status(500).json({ error: "User not found" });
        }

        // Update the user's profile based on the form data
        foundUser.username = req.body.username;
        foundUser.email = req.body.email;
        foundUser.avatar = req.file.filename;

        // Save the updated user profile
        await foundUser.save();

        
        res.redirect(`/profile/${foundUser._id}`);
    } catch (error) {
        console.error(error);
        res.status(500).json({ error: "Internal Server Error" });
    }
});

