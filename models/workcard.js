const mongoose = require('mongoose');

const RpageData = new mongoose.Schema({
    title: {
        type: String
    },
    subtitle: {
        type: String
    },
    subtitle1: {
        type: String
    }, subtitle2: {
        type: String
    },
    image: {
        url: String,
        public_id: String,
    },
    timeSchedule: {
        type: String
    }
});

const Workcard = mongoose.model('Workcard', RpageData);

module.exports = Workcard;
