const _ = require('lodash');
const express = require('express');
const router = express.Router();
const { ghValidate, GetHelp } = require('../models/GetHelp');
// const { ph } = require('../models/ProvideHelp');
const { User } = require('../models/user');
const adminAuth = require('../middleware/adminAuth');

router.post('/', async (req, res) => {
  //validate data from the ph for (req.body)
  const { error } = ghValidate(req.body);
  if (error) {
    return res.status(400).send(error.details[0].message);
  }
  // const user = await User.findById(req.body.user_id);

  const gH = new GetHelp({
    user: req.body.user_id,
    amount: (3 * 2000).toString()
  });

  const data = await gH.save();

  res.send(data);
});

// PH route for admin to fetch all users that wants to gh
router.get('/', adminAuth, async (req, res) => {
  const ghUsers = await GetHelp.find()
    .populate('user', 'accountName bankName accountNumber phoneNumber')
    .sort('-date');
  res.send(ghUsers);
});

// A route that sums the total amount that is to be ghed
router.get('/total', adminAuth, async (req, res) => {
  // find all the ph in the ph collection
  // map thru the amount to return a new array and sum the total ph
  let total = await GetHelp.find().select('amount -_id');
  total = total
    .map(gh => parseInt(gh.amount))
    .reduce((sum, value) => sum + value, 0);

  res.send({ total });
});

// router.post('/ghworthyUser', (req, res) => {
//     const ghWorthyph = ph.find();
//     const ghWorthyph

// })

module.exports = router;
