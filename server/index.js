const winston = require('winston');
const express = require('express');
const app = express();
const path = require('path');
const publicPath = path.join(__dirname, '..', 'public');

//routes
require('./startup/routes')(app);
//database
require('./startup/db')();
//logging errors for async functions and promises(uncaugh and unhadled)
require('./startup/logging')();
//config
require('./startup/config')();
//validation
require('./startup/validate')();

const port = process.env.PORT || 9191;

app.use(express.static(publicPath));



app.get('*', (req, res) => {

    res.sendFile(path.join(publicPath, 'index.html'));

});


app.listen(port, () => {
    winston.info(`App is listening on port: ${port}`);
});