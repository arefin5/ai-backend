const mongoose = require("mongoose");

const reviewSchema = new mongoose.Schema({
 
 postedby:{
  type: mongoose.Schema.ObjectId,
  ref:"User"
 },
 
  review: {
    type: String,
    required: true,
  },
  status: {
    type: String,
    enum: ["pending", "approved"],
    default: "pending", // Default status is pending
    required: true,
  },
}, { timestamps: true });

const Review = mongoose.model("Review", reviewSchema);

module.exports = Review;
