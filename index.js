const winston = require('winston')
const express = require('express');
const app = express();


//routes
require('./startup/routes')(app);
//database
require('./startup/db')();
//logging errors for async functions and promises(uncaugh and unhadled)
require('./startup/logging')();
//config
require('./startup/config')();
//validation
require('./startup/validation')();

const port = process.env.PORT || 9191

app.listen(port, () => {
    winston.info(`App is listening on port: ${port}`);
})