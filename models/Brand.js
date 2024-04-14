const mongoose = require('mongoose');
const { Schema } = mongoose;

            
const BrandSchema = new Schema(
  {
    image: {
    url: String,
    public_id: String,
  },
}
);
module.exports = mongoose.model('Brand',BrandSchema);

