/* import for file upload */
const multer = require('multer');
const path = require('path');
const pubPathImage = path.join(__dirname, '../public/images');
/* import for file upload */


/* using multer */
var storage = multer.diskStorage({
    destination: function(req, file, cb) {
        cb(null, pubPathImage)
    },

    filename: function(req, file, cb) {
        cb(null, file.originalname)
    }
});

var upload = multer({
    storage,
    limits: { fileSize: 90000000000 },
    fileFilter: function(req, file, cb) {
        checkFileType(file, cb)
    }
}).single('image');

//check file type
function checkFileType(file, cb) {
    // Allowed ext
    const filetypes = /jpeg|jpg|png|gif/;
    //check ext
    const extname = filetypes.test(path.extname(file.originalname).toLowerCase());
    //check mime
    const mimetype = filetypes.test(file.mimetype);
    if (mimetype && extname) {
        return cb(null, true);
    } else {
        cb('Error : Images Only!');
    }
}



// upload(req, res, (err) => {

//     if (err) {

//         return res.send(err);
// } else if (req.file === undefined) {
//     return res.status(400).send('Not ok file');
// } else {
//     let dataImg = `${pubPathImage}/${req.file.filename}`

// } // else block
// }) //upload function




module.exports = { upload, pubPathImage }