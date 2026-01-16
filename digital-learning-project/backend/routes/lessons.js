const express = require("express");
const router = express.Router();
const Lesson = require("../models/Lesson");
const { protect, authorize } = require('../middleware/authMiddleware');

// @desc    Get all lessons (optionally filtered by subjectId)
// @route   GET /api/lessons
router.get("/", protect, async (req, res) => {
  try {
    const query = {};
    if (req.query.subjectId) query.subjectId = req.query.subjectId;

    const lessons = await Lesson.find(query).populate('teacherId', 'name');
    res.json(lessons);
  } catch (err) {
    res.status(500).json({ msg: err.message });
  }
});

// @desc    Upload lesson/resource
// @route   POST /api/lessons
// @custom  Teacher/Admin
router.post("/", protect, authorize('teacher', 'admin'), async (req, res) => {
  const { title, description, subjectId, contentUrl, minutes } = req.body;

  if (!subjectId) return res.status(400).json({ msg: 'Subject ID is required' });

  try {
    const lesson = new Lesson({
      title,
      description,
      subjectId,
      teacherId: req.user._id, // Set teacher from auth token
      contentUrl,
      minutes
    });

    await lesson.save();
    res.status(201).json(lesson);
  } catch (err) {
    res.status(400).json({ msg: err.message });
  }
});

module.exports = router;
