const users = require('../routes/user');
const ph = require('../routes/provideHelp');
const gh = require('../routes/getHelp');
const match = require('../routes/matching');
const error = require('../middleware/error');
const express = require('express');
const app = express();
module.exports = (app) => {
    app.use(express.urlencoded({ extended: true }));
    app.use(express.json());
    app.use('/api/user', users);
    app.use('/api/providehelp', ph);
    app.use('/api/gethelp', gh);
    app.use('/api/match', match);


    //error fuction that takes 3 parameters req, res, err
    app.use(error)
}