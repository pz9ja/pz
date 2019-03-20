const _ = require('lodash');
const bcrypt = require('bcrypt');
const mongoose = require('mongoose');
const express = require('express');
const router = express.Router();
const config = require('config');
const jwt = require('jsonwebtoken');
const { Validate, User, loginValidate } = require('../models/user');
const { Referral } = require('../models/Referral');
const authenticateUser = require('../middleware/authenticateUser');
const adminAuth = require('../middleware/adminAuth');
const Mailer = require('../config/mailer');

// this route register new users
router.post('/register', async (req, res) => {
  // validate the body of the request
  const { error } = Validate(req.body);
  if (error) {
    return res.status('400').send({ error: error.details[0].message });
  }

  //check if user exist using email/username
  let username = await User.findOne({ username: req.body.username });
  if (username)
    return res.status(404).send({ error: 'User with username Already exist' });

  let email = await User.findOne({ email: req.body.email });
  if (email)
    return res.status(404).send({ error: 'User with email  Already exist' });

  //create new user
  const newUser = _.pick(req.body, [
    'firstName',
    'lastName',
    'username',
    'phoneNumber',
    'email',
    'password',
    'bankName',
    'accountName',
    'accountNumber'
  ]);

  user = new User(newUser);

  // find the referral
  let userReferrer = await User.findOne({ username: req.body.referral });
  if (!userReferrer) {
    // make any of the admin the referral admin the referral
    const admin = await User.find({ isAdmin: true }).select(
      '_id firstName lastName username '
    );
    // pick an admin by random to claim user
    const index = Math.floor(Math.random() * admin.length);

    userReferrer = admin[index];
  }

  // add the referral in to the database
  const referrer = new Referral({
    newUser: {
      _id: user._id,
      firstName: user.firstName,
      lastName: user.lastName,
      username: user.username
    },
    referredBy: {
      _id: userReferrer._id,
      firstName: userReferrer.firstName,
      lastName: userReferrer.lastName,
      username: userReferrer.username
    }
  });

  // Save the user and also save the referrer
  await user.save();
  await referrer.save();

  //   generate a verification token for the user with the referral
  const token = user.generateAuthToken();

  // send the verification email to the user
  Mailer.send(user.email, token);

  res.header('x-auth-token', token).send({
    success:
      'Account successfully registered, please check your email for verification'
  });
});

// Account Confirmation
router.get('/confirmation/:token', async (req, res) => {
  // Get the token from the url
  const token = req.params.token;
  let decode;
  // try and decode the token received
  try {
    decode = await jwt.verify(token, config.get('pzPrivateKey'));
  } catch (error) {
    res.status(400).send({ error: 'Invalid token' });
    // throw the error
    throw new Error(error);
  }

  //   find the user in the database and confirm his account
  await User.findOneAndUpdate(
    {
      _id: decode._id,
      username: decode.username
    },
    {
      isVerified: true
    }
  );

  res.send({ success: 'Your account has been verified, you can now log in' });
});

// login the user
router.post('/login', async (req, res) => {
  // validate the username/email and password
  const { error } = loginValidate(req.body);
  if (error) return res.status(400).send({ error: error.details[0].message });

  // find the user by credential
  const userCredential = _.pick(req.body, ['username', 'password']);

  try {
    const user = await User.findByCredentials(userCredential);
    // generate an authentication token for the user
    res
      .header('x-auth-token', user.generateAuthToken())
      .send(_.pick(user, ['_id', 'email']));
  } catch (error) {
    res.status(400).send({ error: 'Invalid email or password' });
    // log the error
    console.log(error);
  }
});

// get the current user
router.get('/me', authenticateUser, async (req, res) => {
  const user = await User.findById(req.user._id).select('-password');
  res.send({ user });
});

// route to edit user profile
router.put('/edit/:id', authenticateUser, async (req, res) => {
  const { error } = Validate(req.body);
  if (error) return res.status(400).send({ error: error.details[0].message });

  // validate req.params.id
  if (!mongoose.Types.ObjectId.isValid(req.params.id))
    return res.status(400).send({ error: 'Invalid user' });

  const user = await User.findByIdAndUpdate(req.params.id, {
    firstName: req.body.firstName,
    lastName: req.body.lastName,
    phoneNumber: req.body.phoneNumber
  });

  if (!user)
    return res
      .status(400)
      .send({ error: 'invalid request, user does not exist' });

  res.send({ user });
});

//deactivate and reactivate a user
router.put('/status/:id', adminAuth, async (req, res) => {
  // validate the user id
  if (!mongoose.Types.ObjectId.isValid(req.params.id))
    return res.status(400).send({ error: 'Invalid user' });

  let user = await User.findById(req.params.id);

  // ofcourse there will surely be a user lol the if not really needed
  if (user) {
    // update the user's status
    user.set({
      userStatus: !user.userStatus
    });
  }
  // update the user status
  await user.save();

  res.send({ user });
});

//route to get all users
router.get('/', adminAuth, async (req, res) => {
  const UsersAll = await Users.find();
  if (UsersAll.length == 0) {
    res.send('No registered users available!');
  }
  res.send(UsersAll);
});

//route to get a particular user
router.get('/selected/:id', adminAuth, async (req, res) => {
  const User = await Users.findById(req.params.id);
  res.send(User);
});

//route to get all isVerified users
router.get('/verified', adminAuth, async (req, res) => {
  const VerifiedUser = await Users.find({ isVerified: true });
  if (VerifiedUser.length == 0) {
    res.send('No Verified User Available');
  } else {
    res.send(VerifiedUser);
  }
});

module.exports = router;
