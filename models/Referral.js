const mongoose = require('mongoose');

const userSchema = new mongoose.Schema({
  firstName: {
    required: true,
    type: String,
    minlength: 3,
    maxlength: 50
  },
  lastName: {
    required: true,
    type: String,
    minlength: 3,
    maxlength: 50
  },
  username: {
    required: true,
    type: String,
    minlength: 3,
    maxlength: 50
  }
});

const referralSchema = new mongoose.Schema({
  newUser: {
    type: userSchema,
    required: true
  },
  referredBy: {
    type: userSchema,
    required: true
  }
});

const Referral = mongoose.model('referral', referralSchema);

module.exports = { Referral, userSchema };
