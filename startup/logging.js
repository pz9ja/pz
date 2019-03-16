// error handling
require('express-async-errors');
const winston = require('winston')
require('winston-mongodb')



module.exports = () => {
    winston.handleExceptions(
        new winston.transports.Console({ colorize: true, prettyPrint: true }),
        new winston.transports.File({ filename: 'uncaughtExceptions.log' }));

    process.on("unhandledRejection", (err) => {
        throw err

    })

    //error handling

    //error added to project files

    winston.add(winston.transports.File, { filename: 'logfile.log' });
    //error added to mongodb
    winston.add(winston.transports.MongoDB, { db: 'mongodb://localhost/pz_app', level: 'info' });

}