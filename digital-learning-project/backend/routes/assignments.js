const express = require('express');
const router = express.Router();
const Assignment = require('../models/Assignment');
const { protect, authorize } = require('../middleware/authMiddleware');

// Get all assignments (optionally filter by subjectId)
router.get('/', protect, async (req, res) => {
  try {
    const { subjectId } = req.query;
    const assignments = await Assignment.find(subjectId ? { subjectId } : {});
    res.json(assignments);
  } catch (err) {
    res.status(500).json({ msg: err.message });
  }
});

// Create assignment (teacher/admin only)
router.post('/', protect, authorize('teacher', 'admin'), async (req, res) => {
  try {
    const assignment = await Assignment.create(req.body);
    res.json(assignment);
  } catch (err) {
    res.status(500).json({ msg: err.message });
  }
});

// Submit assignment (student only)
router.post('/:id/submit', protect, async (req, res) => {
  try {
    const { id } = req.params;
    const { content, fileUrl } = req.body;
    const studentId = req.user.id;

    const submission = await Assignment.submit(id, studentId, { content, fileUrl });
    res.json({ msg: 'Assignment submitted successfully', submission });
  } catch (err) {
    res.status(500).json({ msg: err.message });
  }
});

// Get student's submission for an assignment
router.get('/:id/submission', protect, async (req, res) => {
  try {
    const { id } = req.params;
    const studentId = req.user.id;

    const submission = await Assignment.getStudentSubmission(id, studentId);
    res.json(submission);
  } catch (err) {
    res.status(500).json({ msg: err.message });
  }
});

// Get all submissions for an assignment (teacher/admin only)
router.get('/:id/submissions', protect, authorize('teacher', 'admin'), async (req, res) => {
  try {
    const { id } = req.params;
    const submissions = await Assignment.getSubmissions(id);
    res.json(submissions);
  } catch (err) {
    res.status(500).json({ msg: err.message });
  }
});

// Grade submission (teacher/admin only)
router.put('/submissions/:submissionId/grade', protect, authorize('teacher', 'admin'), async (req, res) => {
  try {
    const { submissionId } = req.params;
    const { grade, feedback } = req.body;

    const submission = await Assignment.gradeSubmission(submissionId, grade, feedback);
    res.json({ msg: 'Assignment graded successfully', submission });
  } catch (err) {
    res.status(500).json({ msg: err.message });
  }
});

module.exports = router;
