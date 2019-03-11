const users = require('../routes/user');
const ph = require('../routes/provideHelp');
const error = require('../middleware/error');
const express = require('express');
const app = express();
module.exports = (app) => {
    app.use(express.json());
    app.use('/api/user', users);
    app.use('/api/', ph)


    //error fuction that takes 3 parameters req, res, err
    app.use(error)
}