const mongoose = require('mongoose');

const transactionSchema = new mongoose.Schema({
  pher: {
    type: String,
    required: true
  },
  gher: {
    type: String,
    required: true
  },
  date: {
    type: Date,
    default: Date.now()
  },

  // status: { type: Array, default: [{ notConfirmed: true }, { pending: false }, { confirmed: false }] }
  status: {
    type: Boolean,
    default: false
  }
});

const TransactionsHistory = mongoose.model(
  'transactionhistory',
  transactionSchema
);

module.exports = { TransactionsHistory };
