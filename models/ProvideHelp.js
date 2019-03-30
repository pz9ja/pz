const Joi = require('joi');
Joi.objectId = require('joi-objectid')(Joi);
const mongoose = require('mongoose');
const moment = require('moment');
// const { userSchema } = require('./Referral');
const { User } = require('./user');

//defining the schema for all users
// using the referrence approach
provideHelpSchema = new mongoose.Schema({
  user: {
    type: mongoose.Schema.Types.ObjectId,
    required: true,
    ref: 'User'
  },
  date: {
    type: Date,
    default: moment.now()
  },
  amount: {
    type: String,
    default: '2000'
  },
  expectedGhDate: {
    type: Date,
    default: moment().add(5, 'days')
  },
  phStatus: {
    type: Boolean,
    default: false
  }
});

function phValidate(reqbody) {
  const schema = {
    user_id: Joi.objectId().required()
  };
  return Joi.validate(reqbody, schema);
}
const ProvideHelp = mongoose.model('ProvideHelp', provideHelpSchema);

module.exports = { phValidate, ProvideHelp, provideHelpSchema };
