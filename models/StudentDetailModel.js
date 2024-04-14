const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const StudentDetailsSchema = new Schema({
  Lname: {
    type: String,
  },
  user: {
    type: Schema.Types.ObjectId,
    ref: 'User',
  },
  Fname: {
    type: String,
  },
  address: {
    type: String,
  },
  classOf: {
    type: String,
  },
  branch: {
    type: String,
  },
  studentId: {
    type: String,
  },
  action: {
    type: String,
  },
}, { timestamps: true });

const StudentDetails = mongoose.model('StudentDetails', StudentDetailsSchema);

module.exports = StudentDetails;
