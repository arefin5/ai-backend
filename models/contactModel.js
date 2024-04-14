const mongoose = require('mongoose');

const contactSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true,
  },
  email: {
    type: String,
    required: true,
  },
  phone: {
    type: String,
    required: true,
  },
  msg: {
    type: String,
    required: true,
  },
  status: {
    type: String,
    default: 'Pending', // Assuming a default status
  },
});

const Contact = mongoose.model('Contact', contactSchema);

module.exports = Contact;
