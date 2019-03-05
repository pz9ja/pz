const Joi = require('joi');
Joi.objectId = require('joi-objectid')(Joi)
const config = require('config');
const mongoose = require('mongoose');
const jwt = require('jsonwebtoken');



//defining the schema for all users

phSchema = new mongoose.Schema({
    name: { type: String, minlength: 3, maxlength: 256 },
    phone_number: { type: String, minlength: 10 },
    account_details: { type: Array },
    amount: Number,
    // date: new Date().getDate()

})

function phValidate(reqbody) {
    const schema = {
        user_id: Joi.objectId().required(),
        amount: Joi.number(),

    }
    return Joi.validate(reqbody, schema)

}
const ph = mongoose.model('PH TABLE', phSchema);

module.exports = { phValidate, ph }