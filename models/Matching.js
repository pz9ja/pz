const config = require('config');
const mongoose = require('mongoose');
const jwt = require('jsonwebtoken');
const Joi = require('joi');
const { userSchema } = require('./user')
const matchSchema = new mongoose.Schema({
    pher: { type: String, required: true },
    gher: { type: String, required: true },
    // status: { type: Array, default: [{ notConfirmed: true }, { pending: false }, { confirmed: false }] }
    status: { type: String, required: true }
})


const Match = mongoose.model('MatchedUsers', matchSchema);

module.exports = { Match }