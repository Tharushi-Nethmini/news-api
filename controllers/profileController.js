const User = require('../models/User');

// Get User Profile
exports.getProfile = async (req, res) => {
  try {
    const user = await User.findById(req.userId);

    if (!user) {
      return res.status(404).json({ message: 'User not found' });
    }

    res.json({ name: user.name, email: user.email, profileImage: user.profileImage });
  } catch (error) {
    res.status(500).json({ message: 'Server error' });
  }
};

// Update User Profile
exports.updateProfile = async (req, res) => {
  const { name, email, profileImage } = req.body;

  try {
    const user = await User.findById(req.userId);

    if (!user) {
      return res.status(404).json({ message: 'User not found' });
    }

    user.name = name || user.name;
    user.email = email || user.email;
    user.profileImage = profileImage || user.profileImage;

    await user.save();

    res.json({ message: 'Profile updated successfully', user });
  } catch (error) {
    res.status(500).json({ message: 'Server error' });
  }
};
