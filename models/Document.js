const mongoose = require('mongoose');

const DocumentSchema = new mongoose.Schema({
    name: String,
    studentNid: String,
    branch: String,
    markSheetSSC: String,
    markSheetHSC: String,
    // Add more fields for other documents
  });
  
  const Document = mongoose.model("Document", DocumentSchema);
  module.exports =Document 