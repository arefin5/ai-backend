// AnswareModel


const mongoose = require('mongoose');

const TopSchema = new mongoose.Schema({
    title: {
        type: String,
    },
     
    content: {
        type: String
    },
  
},
    { timestamps: true }
);

const AnswareCard = mongoose.model('AnswareCard', TopSchema);

module.exports = AnswareCard;
