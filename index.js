require('express-async-errors');
const error = require('./middleware/error')
const config = require('config')
const Joi = require('Joi')
Joi.objectId = require('joi-objectid')(Joi)

const express = require('express')
const app = express()

const users = require('./routes/user')
const ph = require('./routes/ph')

const mongoose = require('mongoose')
const con = config.get('pzPrivateKey')
if (!con) {
    console.error('FATAL ERROR: fatal error no config set')
    process.exit(1)
}

mongoose.connect('mongodb://localhost/pz_app', { useNewUrlParser: true })
    .then(() => { console.log('db connected') })
    .catch(err => { console.log(err) })

app.use(express.json());
app.use('/api/user', users);
app.use('/api/', ph)


//error fuction that takes 3 parameters req, res, err
app.use(error)

const port = process.env.PORT || 9191

app.listen(port, () => {
    console.log(`App is listening on port: ${port}`);
})