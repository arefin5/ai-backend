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
    name:{
        type:String
    },
    image: {
        url: String,
        public_id: String,
      },
    reting:{
        type:Number,
    }
    
}, { timestamps: true });

const ReveiwCard = mongoose.model('ReveiwCard', RpageData);

module.exports = ReveiwCard;
