const Joi = require('joi');
Joi.objectId = require('joi-objectid')(Joi)
const config = require('config');
const mongoose = require('mongoose');
const jwt = require('jsonwebtoken');

const getHelpSchema = new mongoose.Schema({
    name: String,
    user_id: String,
    date: { type: Date, default: Date.now() },

})

function ghValidate(reqbody) {
    const schema = {
        user_id: Joi.objectId().required()

    }
    return Joi.validate(reqbody, schema)

}

const GetHelp = mongoose.model('getHelp', getHelpSchema);

module.exports = { GetHelp, ghValidate }