const multer = require("multer");

const storage = multer.diskStorage({
    destination: function (req, file, cb) {
        if (
            file.mimetype == 'image/jpeg' ||  // Check file type match with jpeg, jpg, png, gif
            file.mimetype == 'image/jpg' ||
            file.mimetype == 'image/png' ||
            file.mimetype == 'image/gif'
        ) {
            cb(null, '/public/images/avatar') // If input is valid, save avatar in defined location
        } else {
            cb(new Error('Invalid input'), null) // If input is invalid, do nothing
        }
    },
    filename: function (req, file, cb) {
      const uniqueSuffix = Date.now() + '-' + Math.round(Math.random() * 1E9)
      cb(null, file.fieldname + '-' + uniqueSuffix)
    }
  })
  
const upload = multer({ storage: storage })

module.exports = { upload }