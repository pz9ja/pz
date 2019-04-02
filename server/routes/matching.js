const mongoose = require('mongoose');
const express = require('express');
const router = express.Router();

/* models used in the application */
const { User } = require('../models/user');
const { ProvideHelp } = require('../models/ProvideHelp');
const { GetHelp } = require('../models/GetHelp');
const { Matching } = require('../models/Matching');
const { TransactionsHistory } = require('../models/TransactionsHistory');
const adminAuth = require('../middleware/adminAuth');
const authenticateUser = require('../middleware/authenticateUser');
const { upload, pubPathImage } = require('../middleware/asyncupload');
const randomNumber = `${Math.floor(Math.random() * 100000)}${Date.now()}`;
/* models used in the application */
const Fawn = require('fawn');
Fawn.init(mongoose);

//this route is for admin to match User to one another
router.post('/', adminAuth, async(req, res) => {
    // check if user is in ph table

    const ph = await ProvideHelp.findById(req.body.phid)
        .populate('user', 'firstName lastName phoneNumber')
        .select('-expectedGhDate -phStatus');
    if (!ph) return res.status(404).send({ error: 'User is not on the Ph list' });

    const gh = await GetHelp.findById(req.body.ghid)
        .populate(
            'user',
            'firstName lastName phoneNumber bankName accountName accountNumber'
        )
        .select('-amount');
    if (!gh) return res.status(404).send({ error: 'User is not on the Gh list' });

    // We want to match the two users together
    // const matchedUsers = new Matching({
    //   ph: {
    //     phId: ph._id,
    //     user_id: ph.user._id,
    //     firstName: ph.user.firstName,
    //     lastName: ph.user.lastName,
    //     phoneNumber: ph.user.phoneNumber
    //   },
    //   gh: {
    //     ghId: gh._id,
    //     user_id: gh.user._id,
    //     firstName: gh.user.firstName,
    //     lastName: gh.user.lastName,
    //     phoneNumber: gh.user.phoneNumber,
    //     bankName: gh.user.bankName,
    //     accountName: gh.user.accountName,
    //     accountNumber: gh.user.accountNumber
    //   }
    // });

    const matchUsers = new Matching({
        ph,
        gh
    });

    new Fawn.Task()
        .save('matchedusers', matchUsers)
        .update(
            'providehelps', { _id: ph._id }, {
                $set: {
                    phStatus: true
                }
            }
        )
        .run();

    res.send({ success: 'Users has been paired' });
});

/**
 * Route to get all match in the db
 */
router.get('/', async(req, res) => {});
/**
 * This route is for the user to know who he/she has been paired with
 */
router.get('/payer', authenticateUser, async(req, res) => {
    // if we have a user fetch those who he/she has been paired with to pay
    if (req.user) {

        // const gher = await Matching.find({ 'ph.user._id': req.user._id })
        // first look
        // for any ph that has a match
        const matchedPh = await ProvideHelp.find({
            user: req.user._id,
            phStatus: true
        });
        // if user is in the ph list

        const promise = matchedPh.map(async ph => {
            // if user is in the ph list, check the matching list to know who the user has been paired with
            return await Matching.find({ 'ph._id': ph._id }).select(
                'amount paymentStatus gh.user'
            );
        });

        const gher = await Promise.all(promise);
        res.send(gher);
        // find all match for this particular user
        // const matchedPh = await Matching.find();
        // const a = matchedPh.filter(m => m.ph.user_id == req.user._id);
        // const b = matchedPh.filter(m => m.gh.user_id == req.user._id);
        // res.send({ a: a, b: b });
    } else {
        return res.status(404).send('User not found');
    }
});

// this routes for User to upload evidence of payment to each ph action
router.post('/upload', authenticateUser, (req, res) => {
    // using multer to upload the file to the database

    upload(req, res, err => {
        if (err) {
            return res.send(err);
        } else if (req.file === undefined) {
            return res.status(400).send('Not ok file');
        } else {
            const dataImg = `${pubPathImage}/${req.file.filename}`;
            async function saveData() {
                const match = await Matching.findOneAndUpdate({ _id: req.body._id }, { image: dataImg });
                if (!match)
                    return res.status(400).send('INVALID REQUEST, MATCH NOT FOUND');
                res.send(match);
            } // end of save data function
            saveData();
        } // else block
    });
});

//for receiver aka gher to confirm payment
router.put('/confirmpayment', authenticateUser, async(req, res) => {
    console.log(req.body._id);
    //save update data to matched user
    const match = await Matching.findOneAndUpdate({ _id: req.body._id }, { status: true });
    if (!match) return res.status(400).send('INVALID REQUEST, MATCH NOT FOUND');

    //creating a new transaction data
    const transaction = new TransactionsHistory({
        pher: match.pher,
        gher: match.gher,
        status: match.status
    });

    // select *  from transaction where  user._id == gher._id

    /*using fawn to save delete from matchedUser that has been confirmed by the gher ,
      then move to transaction history table
      */

    if (match) {
        new Fawn.Task()
            .remove('matcheduser', { _id: match._id })
            // delete the ph from the ph table
            .save('transactionhistories', transaction)
            .run();

        // update the amount of the old gh of the person confirming
        let oldGh = await GetHelp.findById(match.ghid);
        console.log(oldGh.amount);

        oldGh.amount = oldGh.amount + 2000;
        oldGh = await oldGh.save();
        console.log(oldGh);

        // if amount is 0 and that user is not an admin
        if (oldGh.amount == 6000) {
            await GetHelp.findByIdAndDelete(oldGh._id);
        }

        // then create a new gh for person phing-<old pher>
        const user = await User.findById(match.pher._id);
        const GH = new GetHelp({
            name: `${user.firstName} ${user.lastName}`,
            user_id: user._id
        });
        const gh = await GH.save();
        res.send(gh);
    }
});

module.exports = router;