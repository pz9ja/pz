const config = require('config');
const mongoose = require('mongoose');
const jwt = require('jsonwebtoken');
const Joi = require('joi');
const { userSchema } = require('./user')
const matchSchema = new mongoose.Schema({
    phid: { type: String, required: true },
    pher: { type: Object, required: true },
    ghid: { type: String, required: true },
    gher: { type: Object, required: true },
    date: { type: Date, default: Date.now() },
    image: String,
    ghNumber: String,

    // status: { type: Array, default: [{ notConfirmed: true }, { pending: false }, { confirmed: false }] }
    status: { type: Boolean, default: false }
})


const Matching = mongoose.model('matcheduser', matchSchema);

module.exports = { Matching }