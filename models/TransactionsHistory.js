const mongoose = require('mongoose');

const transactionSchema = new mongoose.Schema({
    matchingid: String,
    pher: { type: String, required: true },
    gher: { type: String, required: true },
    date: { type: Date, default: Date.now() },
    image: String,

    // status: { type: Array, default: [{ notConfirmed: true }, { pending: false }, { confirmed: false }] }
    status: { type: Boolean, default: false }
})


const TransactionsHistory = mongoose.model('transactionhistory', transactionSchema);

module.exports = { TransactionsHistory }