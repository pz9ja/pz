const winston = require('winston');
//error handlers for our route handlers
module.exports = function(err, req, res, next) {
    res.status(500).send(`Operation Failed with error message: ${err}`)
    winston.error(err.message, err)
    next()
        //log the exception here


}