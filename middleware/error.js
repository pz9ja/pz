const winston = require('winston');
//error handlers for our route handlers
module.exports = function(err, req, res, next) {

    winston.error(err.message, err)

    //log the exception here
    res.status(500).send(`Operation Failed with error message: ${err}`)

}