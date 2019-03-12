const _ = require('lodash')
const bcrypt = require('bcrypt')
const { Validate, Users } = require('../models/user')
const mongoose = require('mongoose')
const express = require('express')
const router = express.Router()
const nodemailer = require('nodemailer');
const config = require('config');
const jwt = require('jsonwebtoken');

// const Mail = require('../classes/mailer')



// creating route for users

router.post('/register', async(req, res) => {
    //validatea req.body

    const { error } = Validate(req.body);
    if (error) {
        res.status('400').send(error.details[0].message)
    }

    //check if user exist using email/username
    let username = await Users.findOne({ username: req.body.username });
    if (username) return res.status(404).send('User with username Already exist');

    let email = await Users.findOne({ email: req.body.email });
    if (email) return res.status(404).send('User with email  Already exist');

    //create new user 

    let user = new Users({
        firstName: req.body.firstName,
        lastName: req.body.lastName,
        username: req.body.username,
        email: req.body.email,
        isAdmin: req.body.isAdmin,
        phoneNumber: req.body.phoneNumber,
        password: req.body.password,
        isVerified: false,

    });


    const salt = await bcrypt.genSalt(10);
    user.password = await bcrypt.hash(user.password, salt);
    user = await user.save();

    const token = user.generateAuthToken();

    res.header('x-user-token', token).send(_.pick(user, ['_id', 'name', 'email', 'password']));


    let transporter = nodemailer.createTransport({
        service: 'gmail',
        auth: {
            user: 'femoxmed@gmail.com',
            pass: 'omotayo123*'
        },
        tls: {
            rejectUnauthorized: false
        }
    });



    let mailOptions = {
        from: 'femoxmed@gmail.com',
        to: 'osarzeh@gmail.com',
        subject: 'Verify your Email Address',
        text: `
        Click the link to verify your email address


        /api/user/confirmation/${token}`
    };

    transporter.sendMail(mailOptions, function(error, info) {
            if (error) {
                console.log('why email fail:', error);
                //delete saved data
            } else
                console.log(info);
        })
        // Mail({
        //     from,
        //     to: "femoxmed@gmail.com",
        //     subject,
        //     text: `
        // Click the link to verify your email address

    // /api/user/confirmation/${token}`
    // })
})

// Account Confirmation
router.get('/confirmation/:token', async(req, res) => {
    const token = req.params.token;
    console.log(token);

    if (!token) {
        res.status(401).send('Access Denied.No token Found');
        return
    }

    const decode = await jwt.verify(token, config.get('pzPrivateKey'))
    req.user = decode;



    const userVerified = await Users.findById(req.user._id)
    console.log(userVerified.email)
    if (userVerified) {
        await Users.findByIdAndUpdate(userVerified._id, { isVerified: true });

        res.send("User verified");
    }

})

// route to edit user profile
router.put('/edit/:id', async(req, res) => {
    const Val = Validate(req.body);
    if (Val.error) return res.status(400).send(Val.error.details[0].message)

    const UsersExist = await Users.findByIdAndUpdate(req.params.id, {
        firstName: req.body.firstName,
        lastName: req.body.lastName,
        phoneNumber: req.body.phoneNumber,

    })

    if (!UsersExist) return res.status(400).send('INVALID REQUEST, Users NOT FOUND')

    res.send(UsersExist)

})

//route to delete a user
router.delete('/delete/:id', async(req, res) => {

    const UsersExist = await Users.findByIdAndDelete(req.params.id);

    if (!UsersExist) return res.status(404).send(' User not found or has already been deleted')

    res.send(`User with username : ${UsersExist.username} has been deleted`);
})

//route to get all users
router.get('/all', async(req, res) => {
    const UsersAll = await Users.find();
    if (UsersAll.length == 0) {
        res.send('No registered users available!')
    }
    res.send(UsersAll);
})

//route to get a particular user
router.get('/selected/:id', async(req, res) => {
    const User = await Users.findById(req.params.id)
    res.send(User);
})

//route to get all isVerified users

router.get('/verified', async(req, res) => {
    const VerifiedUser = await Users.find({ isVerified: true });
    if (VerifiedUser.length == 0) {
        res.send('No Verified User Available')
    } else {
        res.send(VerifiedUser);
    }

})





module.exports = router;