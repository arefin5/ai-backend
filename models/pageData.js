const mongoose = require('mongoose');

const RpageData = new mongoose.Schema({
    title:{
        type:String
        },
        subtitile:{
          type:String
        },
    Address: {
    type: String,
  },
  Contactinfo: {
    type: String,
  },
  timeSchedule:{
    type:String
  }
});

const Rpage = mongoose.model('pagedata', RpageData);

module.exports = Rpage;
