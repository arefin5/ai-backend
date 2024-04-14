const mongoose = require('mongoose');
const { Schema } = mongoose;

            
const SeminerSchema = new Schema(
  {
    title: {
      type: String,
      trim: true,
      required: true,
    },
    subtitle: {
      type: String,
      trim: true,
    },
    
    image: {
    url: String,
    public_id: String,
  },
  time:{
    type: String,
    trim: true,
  },
  date:{
    type: String,
    trim: true,
  }
  },
  { timestamps: true }
);
module.exports = mongoose.model('Seminer', SeminerSchema);

