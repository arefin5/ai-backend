const mongoose = require('mongoose');

const RpageData = new mongoose.Schema({
    title: {
        type: String
    },
    subtitle: {
        type: String
    }, subtitle1: {
        type: String
    },
});

const Featcher = mongoose.model('Featcher', RpageData);

module.exports = Featcher;
