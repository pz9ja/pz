const Joi = require('joi');
Joi.objectId = require('joi-objectid')(Joi)
const config = require('config');
const mongoose = require('mongoose');
const jwt = require('jsonwebtoken');



//defining the schema for all users

phSchema = new mongoose.Schema({
    name: String,
    user_id: String,
    amount: String,
    date: { type: Date, default: Date.now() },
    amount: { type: String, default: "2000" },
    image: String
})

function phValidate(reqbody) {
    const schema = {
        user_id: Joi.objectId().required()

    }
    return Joi.validate(reqbody, schema)

}
const ph = mongoose.model('ProvideHelp', phSchema);

module.exports = { phValidate, ph }