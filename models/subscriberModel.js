const mongoose = require('mongoose');

const subscriberSchema = new mongoose.Schema({
  email: {
    type: String,
    required: true,
    unique: true,
    trim: true,
    lowercase: true,
  },
});

const Subscriber = mongoose.model('Subscriber', subscriberSchema);

module.exports = Subscriber;
