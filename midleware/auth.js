// midleware/auth.js

const { verify } = require('jsonwebtoken');
const dotenv = require('dotenv');
const User = require('../models/userModel'); // Import your User model

dotenv.config();

const secret = process.env.JWT_SECRET;

// Middleware to check the authorization token
const requireAuth = async (req, res, next) => {
  const token = req.headers.authorization;

  if (!token) {
    return res.status(401).json({ error: 'Unauthorized - Token missing' });
  }

  try {
    const decoded = verify(token.split(' ')[1], secret);
    // Fetch the complete user data from the database
    const user = await User.findById(decoded._id);
    
    if (!user) {
      return res.status(401).json({ error: 'Unauthorized - User not found' });
    }

    // Attach the user data to the request
    req.user = user;
    next();
  } catch (err) {
    console.error('Token verification error:', err);
    return res.status(401).json({ error: 'Unauthorized - Invalid token' });
  }
};

module.exports = { requireAuth };
