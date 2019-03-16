const users = require('../routes/user');
const provideHelp = require('../routes/provideHelp');
const getHelp = require('../routes/getHelp');
const match = require('../routes/matching');
const login = require('../routes/login');
const error = require('../middleware/error');
const express = require('express');


module.exports = (app) => {
    app.use(express.urlencoded({ extended: true }));
    app.use(express.json());
    app.use('/api/user', users);
    app.use('/api/user/providehelp', provideHelp);
    app.use('/api/user/gethelp', getHelp);
    app.use('/api/admin/match', match);
    app.use('/api/auth', login);


    //error fuction that takes 3 parameters req, res, err
    app.use(error)
}