const mongoose = require('mongoose');

const CaruselModelSchema = new mongoose.Schema({
  title: {
    type: String,
  },
  content: {
    type: String,
  },
  image: {
    url: String,
    public_id: String,
  },
  
  category: {
    type: String, // Assuming the category is a string, adjust the type as needed
  },
  
  status: {
    type: String,
    enum: ['draft', 'published'], 
    default: 'draft', // Default value is 'draft'
  },
  // Add other fields as needed
});

const CaruselModel = mongoose.model('CaruselModel', CaruselModelSchema);

module.exports = CaruselModel;
