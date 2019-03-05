const users = require('../routes/user');

module.exports = function(app) {
    app.use(express.json());
    app.use('/api/user', users);

    app.use(error);
}