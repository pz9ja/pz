const mongoose = require('mongoose');
const express = require('express');
const router = express.Router();

/* models used in the application */
const { Users } = require('../models/user');
const { ph } = require('../models/ProvideHelp');
const { GetHelp } = require('../models/GetHelp');
const { Matching } = require('../models/Matching');
const { TransactionsHistory } = require('../models/TransactionsHistory');

const { upload, pubPathImage } = require('../middleware/asyncupload');

/* models used in the application */

//this route is for admin to match users to one another
router.post('/', async(req, res) => {

    // check if user is in ph table

    const Pher = await ph.findById(req.body.pherid);
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
router.put('/upload', (req, res) => {
    // using multer to upload the file to the database

    upload(req, res, (err) => {

        if (err) {

            return res.send(err);
        } else if (req.file === undefined) {
            return res.status(400).send('Not ok file');
        } else {

            const dataImg = `${pubPathImage}/${req.file.filename}`
            async function saveData() {
                const match = await Matching.findOneAndUpdate({ _id: req.body._id }, { image: dataImg });
                if (!match) return res.status(400).send('INVALID REQUEST, MATCH NOT FOUND');
                res.send(match)
            } // end of save data function
            saveData()
        } // else block
    })
})

//for receiver aka gher to confirm payment
router.put('/confirmpayment', async(req, res) => {

    //save update data to matched user
    const match = await Matching.findByIdAndUpdate(req.body._id, { status: true });
    if (!match) return res.status(400).send('INVALID REQUEST, MATCH NOT FOUND');

    //creating a new transaction data 
    const transaction = new TransactionsHistory({
        matchingid: match._id,
        pher: match.pher,
        gher: match.gher,
        image: match.image,
        status: match.status,
        phNumber: "432"
    })

    /*using fawn to save delete from matchedusers that has been confirmed by the gher ,
    then move to transaction history table
    */


    .remove('matchedusers', { _id: match._id })
        .save('transactionhistory', transaction)
        .run()



    res.send(match)
})


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

module.exports = router