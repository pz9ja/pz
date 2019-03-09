const config = require('config');
const mongoose = require('mongoose');
const jwt = require('jsonwebtoken');
const Joi = require('joi');

//defining the schema for all users

const userSchema = new mongoose.Schema({
    firstName: {
        required: true,
        type: String,
        minlength: 3,
        maxlength: 256
    },

    lastName: {
        required: true,
        type: String,
        minlength: 3,
        maxlength: 256
    },

    phoneNumber: {
        required: true,
        type: String
    },
    email: {
        type: String,
        required: true,

    },

    username: {
        required: true,
        type: String,
        minlength: 3,
        maxlength: 256,

    },


    isAdmin: {
        type: Boolean,
        default: false
    },

    isVerified: {
        type: Boolean,
        default: false
    },

    password: {
        type: String,
        required: true,
        minlength: 5
    },

    url: {
        type: String,
        default: null
    },

    // referrals: [userSchema]
});

// function to generate web token for the user 

userSchema.methods.generateAuthToken = function() {
    return jwt.sign({ _id: this._id, isAdmin: this.isAdmin, isVerified: this.isVerified }, config.get('pzPrivateKey')), {

        expiresIn: '8h' // expires in 8 hours

    }
};

// joi to validate users input
function Validate(reqbody) {
    const schema = {
        username: Joi.string().min(3).max(250).required(),
        firstName: Joi.string().min(3).max(250).required(),
        lastName: Joi.string().min(3).max(250).required(),
        isAdmin: Joi.boolean(),
        phoneNumber: Joi.string(),
        email: Joi.string().email(),
        password: Joi.string().min(5).max(256).required().strict(),
        confirm_password: Joi.string().valid(Joi.ref('password')).required().strict()

    }
    return Joi.validate(reqbody, schema)
};


const Users = mongoose.model('Users', userSchema)

module.exports = { Users, Validate }