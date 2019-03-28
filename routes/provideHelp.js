const _ = require('lodash');
const { ProvideHelp } = require('../models/ProvideHelp');
const { User } = require('../models/user');
const express = require('express');
const router = express.Router();
const adminAuth = require('../middleware/adminAuth');
const authenticateUser = require('../middleware/authenticateUser');

router.post('/', authenticateUser, async (req, res) => {
  // get the user that wants to make ph and insert into the ph table
  let user = req.user;
  // check if we have a user and that user is verified
  if ((user && !user.isVerified) || !user) {
    return res.status(400).send();
  }
  // get other properties of the user from the user schema and insert into the ph collection
  user = await User.findOne({ _id: user._id }).select(
    '_id firstName lastName username'
  );
  /* Osaz the for loop was created to add the user three times to th ph table in a
     single ph request , and all those three request will be tracked by a ph Number which 
     is a number concatenated witb a Date.now() */
  const ph = new ProvideHelp({ user });
  await ph.save();

  res.send();
});

// PH route for admin to fetch all users that  ph
router.get('/', adminAuth, async (req, res) => {
  const phUsers = await ProvideHelp.find()
    .populate('user', 'firstName lastName username phoneNumber')
    .sort('-date');
  res.send(phUsers);
});

// A route that sums the total amount that was phed
router.get('/total', adminAuth, async (req, res) => {
  // find all the ph in the ph collection
  // map thru the amount to return a new array and sum the total ph
  let total = await ProvideHelp.find().select('amount -_id');
  total = total
    .map(ph => parseInt(ph.amount))
    .reduce((sum, value) => sum + value, 0);

  res.send({ total });
});

module.exports = router;
