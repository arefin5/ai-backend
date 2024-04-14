const mongoose = require('mongoose');
const { Schema } = mongoose;
const userSchema = new Schema(
  {
    name: {
      type: String,
      trim: true,
      required: true,
    },
    email: {
      type: String,
      trim: true,
    },
    password: {
      type: String,
      required: true,
      min: 6,
      max: 64,
    },
    country: {
      type: String,
      unique: true,
    },

    role: {
      type: String,
      default: "gust",
    },
  },
  { timestamps: true }
);
module.exports = mongoose.model('User', userSchema);

