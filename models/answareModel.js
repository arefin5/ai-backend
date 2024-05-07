// AnswareModel


const mongoose = require('mongoose');

const TopSchema = new mongoose.Schema({
    title: {
        type: String,
    },
     
    subtitle: {
        type: String
    },
  
},
    { timestamps: true }
);

const Answare = mongoose.model('Answare', TopSchema);

module.exports = Answare;
