const mongoose = require('mongoose');
const Joi = require('joi');
const moment = require('moment');
const { ProvideHelp } = require('./ProvideHelp');
const { GetHelp } = require('./GetHelp');

// const matchSchema = new mongoose.Schema({
//   phid: {
//     type: mongoose.Schema.Types.ObjectId,
//     required: true
//   },
//   pher: {
//     type: Object,
//     required: true
//   },
//   ghid: {
//     type: mongoose.Schema.Types.ObjectId,
//     required: true
//   },
//   gher: { type: Object, required: true },
//   date: {
//     type: Date,
//     default: moment()
//   },
//   file: String,
//   ghNumber: String,

//   // status: { type: Array, default: [{ notConfirmed: true }, { pending: false }, { confirmed: false }] }
//   status: { type: Boolean, default: false }
// });

// what this schema holds are
/**
 * detailsofPhUser detailsOfGhUser  amountToPay  paymentStatus fileUrl
 */
const matchSchema = new mongoose.Schema({
  ph: {
    type: Object
  },
  gh: {
    type: Object
  },
  file: {
    type: String
  },
  amount: {
    type: String
  },
  paymentStatus: {
    type: Boolean,
    default: false
  }
});

const Matching = mongoose.model('matcheduser', matchSchema);

module.exports = { Matching };
