const mongoose = require('mongoose');
const { Schema } = mongoose;

            
const VideoSchema = new Schema(
  {
    title: {
      type: String,
      trim: true,
      required: true,
      unique: true,

    },
    playlistTitle:{
    type: String,
    trim: true,
    unique: true,

  }
  },
  { timestamps: true }
);
module.exports = mongoose.model('Video', VideoSchema);

