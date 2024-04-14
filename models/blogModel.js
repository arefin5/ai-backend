const mongoose = require('mongoose');

const blogSchema = new mongoose.Schema({
  title: {
    type: String,
    required: true,
  },
  content: {
    type: String,
    required: true,
  },
  image: {
    url: String,
    public_id: String,
  },
  
  category: {
    type: String, // Assuming the category is a string, adjust the type as needed
    required: true,
  },
  author: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User', // Reference to the User model
    required: true,
  },
  status: {
    type: String,
    enum: ['draft', 'published'], 
    default: 'draft', // Default value is 'draft'
  },
  tags: {
    blogs: {
      type: Boolean,
      default: false,
    },
    study: {
      type: Boolean,
      default: false,
    },
    service: {
      type: Boolean,
      default: false,
    },
  },
  // Add other fields as needed
},
{ timestamps: true }
);

const Blog = mongoose.model('Blog', blogSchema);

module.exports = Blog;
