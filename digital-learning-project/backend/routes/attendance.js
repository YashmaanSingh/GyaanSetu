const express = require('express');
const router = express.Router();
const Attendance = require('../models/Attendance');
const { protect, authorize } = require('../middleware/authMiddleware');

// @desc    Get attendance for a specific class
// @route   GET /api/attendance/:classId
router.get('/:classId', protect, async (req, res) => {
  try {
    const attendance = await Attendance.find({ classId: req.params.classId }).sort({ date: -1 });
    res.json(attendance);
  } catch (err) {
    res.status(500).json({ msg: err.message });
  }
});

// @desc    Mark attendance
// @route   POST /api/attendance
// @custom  Teacher/Admin
router.post('/', protect, authorize('teacher', 'admin'), async (req, res) => {
  const { date, classId, records } = req.body;
  try {
    // Check if attendance already exists for this date and class
    // We normalize date to start of day to avoid time issues
    const startOfDay = new Date(date);
    startOfDay.setHours(0, 0, 0, 0);
    const endOfDay = new Date(date);
    endOfDay.setHours(23, 59, 59, 999);

    let attendance = await Attendance.findOne({
      classId,
      date: { $gte: startOfDay, $lte: endOfDay }
    });

    if (attendance) {
      // Update existing
      attendance.records = records;
      await attendance.save();
    } else {
      // Create new
      attendance = await Attendance.create({ date: startOfDay, classId, records });
    }

    res.status(201).json(attendance);
  } catch (err) {
    res.status(400).json({ msg: err.message });
  }
});

module.exports = router;
