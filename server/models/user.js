const config = require('config');
const mongoose = require('mongoose');
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
const Joi = require('joi');

//defining the schema for all users

const userSchema = new mongoose.Schema({
    firstName: {
        required: true,
        type: String,
        minlength: 3,
        maxlength: 50
    },
    lastName: {
        required: true,
        type: String,
        minlength: 3,
        maxlength: 50
    },
    phoneNumber: {
        required: true,
        type: String
    },
    email: {
        type: String,
        required: true,
        maxlength: 100
    },
    bankName: {
        type: String,
        required: true
    },
    accountName: {
        type: String,
        required: true
    },
    accountNumber: {
        type: String,
        required: true,
        maxlength: 10
    },
    username: {
        required: true,
        type: String,
        minlength: 3,
        maxlength: 50
    },
    password: {
        type: String,
        required: true,
        maxlength: 1024
    },
    dateRegistered: {
        type: Date,
        default: Date.now
    },
    isVerified: {
        type: Boolean,
        default: false
    },
    userStatus: {
        type: Boolean,
        default: true
    },
    isAdmin: {
        type: Boolean,
        default: false
    }
});

// function to generate web token for the user
userSchema.methods.generateAuthToken = function() {
    return jwt.sign({
            _id: this._id,
            username: this.username,
            isAdmin: this.isAdmin,
            isVerified: this.isVerified,
            userStatus: this.userStatus
        },
        config.get('pzPrivateKey')
    );
};

userSchema.statics.findByCredentials = async function(loginCredential) {
    const User = this;
    const { username, password } = loginCredential;
    //  find the user by the username or email address
    const user = await User.findOne().or([{ username }, { email: username }]);

    if (user) {
        // tell bcrypt to compare their password
        const validated = await bcrypt.compare(password, user.password);

        if (validated) {
            // if password is valid
            return Promise.resolve(user);
        } else {
            return Promise.reject(new Error('Password Mismatch'));
        }
    }
};

// before saving the user hash the password
userSchema.pre('save', async function(next) {
    const user = this;

    // if the password is modified, encrypt it
    if (user.isModified('password')) {
        const salt = await bcrypt.genSalt(10);
        user.password = await bcrypt.hash(user.password, salt);

        next();
    } else {
        next();
    }
});

// joi to validate users input
function Validate(user) {
    const schema = {
        firstName: Joi.string()
            .min(3)
            .max(50)
            .required(),
        lastName: Joi.string()
            .min(3)
            .max(50)
            .required(),
        username: Joi.string()
            .min(3)
            .max(50)
            .required(),
        phoneNumber: Joi.string().required(),
        email: Joi.string()
            .email()
            .max(100)
            .required(),
        bankName: Joi.string().required(),
        accountName: Joi.string().required(),
        accountNumber: Joi.string()
            .required()
            .min(10)
            .max(10),
        password: Joi.string()
            .min(5)
            .max(50)
            .required()
            .strict(),
        confirm_password: Joi.string()
            .valid(Joi.ref('password'))
            .required()
            .strict(),
        referral: Joi.string()
    };
    return Joi.validate(user, schema);
}

function loginValidate(user) {
    const schema = {
        username: Joi.string()
            .required()
            .error(err => ({ message: 'username or email address is required' })),
        password: Joi.string().required()
    };
    return Joi.validate(user, schema);
}

const User = mongoose.model('User', userSchema);

module.exports = { User, Validate, userSchema, loginValidate };