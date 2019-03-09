const mongoose = require('mongoose')
const winston = require('winston')

module.exports = () => {
    mongoose.connect('mongodb://localhost/pz_app', { useNewUrlParser: true })
        .then(() => { winston.info('Database connected successfully') })
}