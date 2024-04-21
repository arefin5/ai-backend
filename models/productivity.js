const mongoose = require('mongoose');

const TopSchema = new mongoose.Schema({
    title1: {
        type: String,
    },
    title2: {
        type: String,
    }, title3: {
        type: String,
    }
    , title4: {
        type: String,
    }, title5: {
        type: String,
    },
    title6: {
        type: String,
    }, title7: {
        type: String,
    }, title8: {
        type: String,
    },
      firstButton: {
        type: String
    },



},
    { timestamps: true }
);

const Productivity = mongoose.model('Productivity', TopSchema);

module.exports = Productivity;
