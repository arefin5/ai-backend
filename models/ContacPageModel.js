const mongoose = require('mongoose');

const ContacPageSchema = new mongoose.Schema({
  title: {
    type: String,
  },
  content: {
    type: String,
  },
  image: {
    url: String,
    public_id: String,
  }
});

const ContacPage = mongoose.model('ContacPage', ContacPageSchema);

module.exports = ContacPage;
