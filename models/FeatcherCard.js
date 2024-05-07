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
    }



    , content: {
        type: String
    },
    content1: {
        type: String
    },
    content2: {
        type: String
    },
    content3: {
        type: String
    },
    content4: {
        type: String
    },
    tag: {
        type: String

    },
    image: {
        type: String,

    },
    timeSchedule: {
        type: String
    }
});

const FeatcherCard = mongoose.model('FeatcherCard', RpageData);

module.exports = FeatcherCard;
