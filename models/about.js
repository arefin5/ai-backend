const mongoose = require('mongoose');

const RpageData = new mongoose.Schema({
    title: {
        type: String
    },
    subtitile: {
        type: String
    },
    timeSchedule: {
        type: String
    }
});

const About = mongoose.model('About', RpageData);

module.exports = About;
