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
    sltitle:{
        type:String
    },
    subtitle1:{
       type:String
    },
    subtitle2:{
        type:String
     },
     cardtitle:{
        type:String
     },
     reveiwtitle:{
        type:String
     },
    image: {
        url: String,
        public_id: String,
    },firstButton:{
        type:String
    },
    secendButton:{
        type:String
    }



},
    { timestamps: true }
);

const Top = mongoose.model('Top', TopSchema);

module.exports = Top;
