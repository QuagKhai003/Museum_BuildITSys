const multer = require('multer');
const path = require('path');
const artwork = require('../models/artwork');
const user = require('../models/user');

const storage = multer.diskStorage({
    destination : (req, file, cb) => { //Cheking file type jpg, png, jpeg
        if( file.mimetype === 'image/jpg'||
            file.mimetype === 'image/png'||
            file.mimetype === 'image/jpeg') {
                cb(null, 'public/images/artwork');
        } else{
            cb(new Error('not image', false))
        }
    },
    filename: (req, file, cb) => {
        console.log(file)
        cb(null, Date.now() + path.extname(file.originalname))
    }
})

const storageAva = multer.diskStorage({
    destination : (req, file, cb) => { //Cheking file type jpg, png, jpeg
        if( file.mimetype === 'image/jpg'||
            file.mimetype === 'image/png'||
            file.mimetype === 'image/jpeg') {
                cb(null, 'public/images/avatar');
        } else{
            cb(new Error('not image', false))
        }
    },
    filename: (req, file, cb) => {
        console.log(file)
        cb(null, Date.now() + path.extname(file.originalname))
    }
})

const upload = multer({storage: storage});

const uploadAva = multer({storage: storageAva})

// Function to handle artwork upload
const uploadArtworks = async (req, res, next) => {
    try {
        if ( req.session.user.role == "artist") {
            const artworkData = {
                artworkName: req.body.artworkName,
                artworkAuthor: req.body.artworkAuthor,
                artworkArtist: req.session.user.name,
                category: req.body.category,
                artworkDescription: req.body.artworkDescription,
                image: req.file.filename,
            };
        
            const newAW = await artwork.create(artworkData)
            // Save the document to MongoDB
            const userLogged = await user.findOne({_id : req.session.user.id})
    
            userLogged.uploads.push(newAW._id)
    
            await userLogged.save()
    
            console.log("Upload complete")
    
            res.status(200).redirect("/upload")
        } else {
            console.log("You dont have this permission")
            res.status(401).redirect('/error')

        }
    } catch (err) {
        console.log("Error while upload a new artwork:", err)
        res.status(500).redirect("/error")
    }
    
}

module.exports = { 
    uploadArtworks, 
    upload,
    uploadAva,
};