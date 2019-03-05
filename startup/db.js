const winston = require('winston');
const mongoose = require('mongoose');

module.exports = function() {
    mongoose.connect('mongodb://localhost/pz_app')
        .then(() => { console.log('connected');
            winston.info('Connected to MongoDB...') });
}