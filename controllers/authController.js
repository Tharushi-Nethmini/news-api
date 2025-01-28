const User = require('../models/User');
const jwt = require('jsonwebtoken');

// Register User
// Register User
exports.registerUser = async (req, res) => {
    const { name, email, password } = req.body;
  
    try {
      // Check if user already exists
      const userExists = await User.findOne({ email });
  
      if (userExists) {
        return res.status(400).json({ message: 'User already exists' });
      }
  
      // Create new user
      const user = await User.create({ name, email, password });
      console.log(user._id);
  
      // Generate JWT token
      const token = jwt.sign({ userId: user._id }, 'tharushi_nethmini', { expiresIn: '1d' });
      console.log(token);
  
      res.status(201).json({ token, user });
    } catch (error) {
      console.error('Error during registration:', error);  // Log the error details
      res.status(500).json({ message: 'Server error' });
    }
  };
  
  // Login User
  exports.loginUser = async (req, res) => {
    const { email, password } = req.body;
  
    try {
      const user = await User.findOne({ email });
  
      if (!user) {
        return res.status(400).json({ message: 'Invalid credentials' });
      }
  
      const isMatch = await user.matchPassword(password);
  
      if (!isMatch) {
        return res.status(400).json({ message: 'Invalid credentials' });
      }
  
      const token = jwt.sign({ userId: user._id }, 'tharushi_nethmini', { expiresIn: '1d' });
  
      res.json({ token, user });
    } catch (error) {
      console.error('Error during login:', error);  // Log the error details
      res.status(500).json({ message: 'Server error' });
    }
  };
  