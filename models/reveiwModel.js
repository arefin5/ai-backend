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
    
}, { timestamps: true });

const Reveiw = mongoose.model('Reveiw', RpageData);

module.exports = Reveiw;
