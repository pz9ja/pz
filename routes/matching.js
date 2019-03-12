const mongoose = require('mongoose');
const express = require('express');
const router = express.Router();
const { Users } = require('../models/user');
const { ph } = require('../models/ProvideHelp');
const { GetHelp } = require('../models/GetHelp');
const { Matching } = require('../models/Matching');
const { TransactionsHistory } = require('../models/TransactionsHistory')
const multer = require('multer');
const path = require('path');
const pubPathImage = path.join(__dirname, '../public/images');
const Fawn = require('fawn');
Fawn.init(mongoose);

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

//this route is for admin to match users to one another
router.post('/', async(req, res) => {

    // check if user is in ph table

    const Pher = await ph.findById(Objectid(req.body.pherid));
    if (!Pher) return res.status(404).send("The Phing user is not found");

    const Gher = await GetHelp.findById(req.body.gherid);
    if (!Gher) return res.status(404).send("The Selected Gher is not found");

    const matchUser = new Matching({
        pher: req.body.pherid,
        gher: req.body.gherid

    });

    const data = await matchUser.save();
    res.send(data);

})

// this routes for users to upload evidence of payment to each ph action
router.put('/upload', async(req, res) => {
    // using multer to upload the file to the database
    upload(req, res, (err) => {

            if (err) {

                return res.send(err);
            } else if (req.file === undefined) {
                return res.status(400).send('Not ok file');
            } else {
                let dataImg = `${pubPathImage}/${req.file.filename}`

                // function to save image path in the database
                async function saveData() {
                    const match = await Matching.findByIdAndUpdate(req.body._id, { image: dataImg }, { new: true });
                    if (!match) return res.status(400).send('INVALID REQUEST, MATCH NOT FOUND');
                    res.send(dataImg)

                } // end of save data function
                saveData()
            } // else block
        }) //upload function


})

//for receiver aka gher to confirm payment
router.put('/confirmpayment', async(req, res) => {

    //save update data to matched user
    const match = await Matching.findByIdAndUpdate(req.body._id, { status: true }, { new: true });
    if (!match) return res.status(400).send('INVALID REQUEST, MATCH NOT FOUND');


    console.log(match);
    const transaction = new TransactionsHistory({
        matchingid: match._id,
        pher: match.pher,
        gher: match.pher,
        image: match.image,
        status: match.status
    })

    new Fawn.Task()
        .remove('matchedusers', { _id: match._id })
        .save('transactionhistory', transaction)
        .run()

    res.send(match)
})

module.exports = router