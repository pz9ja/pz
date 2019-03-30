const Joi = require('joi');
Joi.objectId = require('joi-objectid')(Joi);
const mongoose = require('mongoose');
const moment = require('moment');
const { User } = require('./user');

// const getHelpSchema = new mongoose.Schema({
//     name: String,
//     user_id: String,
//     amount: { type: Number, default: 2000 },
//     date: { type: Date, default: Date.now() }
// })

const getHelpSchema = new mongoose.Schema({
  user: {
    type: mongoose.Schema.Types.ObjectId,
    required: true,
    ref: 'User'
  },
  date: {
    type: Date,
    default: moment()
  },
  amount: {
    type: String
  }
});

function ghValidate(reqbody) {
  const schema = {
    user_id: Joi.objectId().required()
  };
  return Joi.validate(reqbody, schema);
}

const GetHelp = mongoose.model('getHelp', getHelpSchema);

module.exports = { GetHelp, ghValidate, getHelpSchema };
