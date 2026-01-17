const express = require('express');
const router = express.Router();
const User = require('../models/User');
const { protect, authorize } = require('../middleware/authMiddleware');

// Get all users (Admin only)
router.get('/', protect, authorize('admin'), async (req, res) => {
  try {
    const users = await User.find().select('-password');
    res.json(users);
  } catch (err) {
    res.status(500).json({ msg: err.message });
  }
});

// Get students by class (Teacher/Admin)
router.get('/students/:classId', protect, async (req, res) => {
  try {
    const students = await User.find({ role: 'student', classId: req.params.classId }).select('name email role classId');
    res.json(students);
  } catch (err) {
    res.status(500).json({ msg: err.message });
  }
});

// Update user profile (Self - e.g. join class)
router.put('/profile', protect, async (req, res) => {
  try {
    const user = await User.findById(req.user._id);
    if (!user) return res.status(404).json({ msg: 'User not found' });

    if (req.body.classId) {
      user.classId = req.body.classId;
    }
    // Add other profile updates here if needed

    await user.save();
    res.json({ success: true, user: { id: user._id, name: user.name, role: user.role, classId: user.classId } });
  } catch (err) {
    res.status(500).json({ msg: err.message });
  }
});

// Get system stats (Admin only)
router.get('/stats', protect, authorize('admin'), async (req, res) => {
  try {
    const students = await User.countDocuments({ role: 'student' });
    const teachers = await User.countDocuments({ role: 'teacher' });
    const classes = await mongoose.model('Class').countDocuments();
    const subjects = await mongoose.model('Subject').countDocuments();

    res.json({ students, teachers, classes, subjects });
  } catch (err) {
    res.status(500).json({ msg: err.message });
  }
});

module.exports = router;
