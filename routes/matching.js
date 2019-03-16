const mongoose = require('mongoose');
const express = require('express');
const router = express.Router();

/* models used in the application */
const { Users } = require('../models/user');
const { ph } = require('../models/ProvideHelp');
const { GetHelp } = require('../models/GetHelp');
const { Matching } = require('../models/Matching');
const { TransactionsHistory } = require('../models/TransactionsHistory');
const adminAuth = require('../middleware/adminAuth');
const userAuth = require('../middleware/userAuth');
const { upload, pubPathImage } = require('../middleware/asyncupload');
const randomNumber = `${Math.floor(Math.random() * 100000  )}${Date.now()}`;
/* models used in the application */
const Fawn = require('fawn');
Fawn.init(mongoose);

//this route is for admin to match users to one another
router.post('/', adminAuth, async(req, res) => {

    // check if user is in ph table

    const Ph = await ph.findById(req.body.phid);
    if (!Ph) return res.status(404).send("The Phing user is not found");

    const Gh = await GetHelp.findById(req.body.ghid);
    if (!Gh) return res.status(404).send("The Selected Gher is not found");

    const phUser = await Users.findById(Ph.user_id);
    const ghUser = await Users.findById(Gh.user_id);

    const matchUser = new Matching({
        phid: req.body.phid,
        ghid: req.body.ghid,
        ghNumber: Gh.phNumber,
        pher: {
            _id: Ph.user_id,
            name: `${phUser.firstName} ${phUser.lastName}`
        },
        gher: {
            _id: Gh.user_id,
            name: `${ghUser.firstName} ${ghUser.lastName}`
        }
    });

    const pid = mongoose.Types.ObjectId(Ph._id);
    console.log(pid)
    Fawn.Task()
        .save('matchedusers', matchUser)
        .remove('providehelps', { _id: pid })
        .run()
    res.send(matchUser);
})

// this routes for users to upload evidence of payment to each ph action
router.post('/upload', userAuth, (req, res) => {
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
router.put('/confirmpayment', userAuth, async(req, res) => {
    console.log(req.body._id)
        //save update data to matched user
    const match = await Matching.findOneAndUpdate({ _id: req.body._id }, { status: true });
    if (!match) return res.status(400).send('INVALID REQUEST, MATCH NOT FOUND');

    //creating a new transaction data 
    const transaction = new TransactionsHistory({
        matchingid: match._id,
        pher: match.pher,
        gher: match.gher,
        image: match.image,
        status: match.status

    })

    // select *  from transaction where  user._id == gher._id


    /*using fawn to save delete from matchedusers that has been confirmed by the gher ,
    then move to transaction history table
    */

    if (match) {
        new Fawn.Task()
            .remove('matcheduser', { _id: match._id })
            .save('transactionhistories', transaction)
            .run()

        // update the amount of the old gh of the person confirming
        let oldGh = await GetHelp.findById(match.ghid);
        console.log(oldGh.amount)

        oldGh.amount = oldGh.amount + 2000;
        oldGh = await oldGh.save();
        console.log(oldGh)

        if (oldGh.amount == 6000) {
            await GetHelp.findByIdAndDelete(oldGh._id)
        }

        // then create a new gh for person phing
        const user = await Users.findById(match.pher._id);
        const GH = new GetHelp({
            name: `${user.firstName} ${user.lastName}`,
            user_id: user._id
        });
        const gh = await GH.save();
        res.send(gh);

    }

})



module.exports = router