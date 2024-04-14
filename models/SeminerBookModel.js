const mongoose = require('mongoose');
const { Schema } = mongoose;
const SeminerBookModel = new Schema(
  {
    name: {
      
      type: String,
      trim: true,
      required: true,
    },
    email: {
      type: String,
      trim: true,
      required: true,
    },
    phone: {
      type: String,
      trim: true,
      required: true,
    }
 
  
    

},
  { timestamps: true }
);
module.exports = mongoose.model('SeminerBooking', SeminerBookModel);

