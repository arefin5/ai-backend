// models/team.js

const mongoose = require('mongoose');

const teamSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true,
  },
  image: {
    url: String,
    public_id: String,
  },
  facebook: {
    type: String,
  },
  twiter: {
    type: String,
  },
  email: {
    type: String,
  },
  position:{
    type: Number,

  },
  linkdin: {
    type: String,
  },
  youtube: {
    type: String,
  },
  designation: {
    type: String,
    required: true
  }, author: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User', // Reference to the User model
    required: true,
  },
});

const Team = mongoose.model('Team', teamSchema);

module.exports = Team;
