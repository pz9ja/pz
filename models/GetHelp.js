const mongoose = require('mongoose');

const getHelpSchema = new mongoose.Schema({
    user: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'User'
    }
})

const GetHelp = mongoose.model('getHelp', getHelpSchema);

module.exports = { GetHelp }