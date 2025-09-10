// routes/progress.js
const express = require("express");
const router = express.Router();
const Progress = require("../models/Progress");

// Get student progress
router.get("/:studentId", async (req, res) => {
  const progress = await Progress.findOne({ studentId: req.params.studentId });
  res.json(progress || { completedLessons: [], scores: {} });
});

// Update lesson progress
router.post("/lesson", async (req, res) => {
  const { studentId, lessonId } = req.body;
  let prog = await Progress.findOne({ studentId });
  if (!prog) prog = new Progress({ studentId, completedLessons: [], scores: {} });
  if (!prog.completedLessons.includes(lessonId)) prog.completedLessons.push(lessonId);
  await prog.save();
  res.json(prog);
});

// Update quiz score
router.post("/quiz", async (req, res) => {
  const { studentId, assignmentId, score } = req.body;
  let prog = await Progress.findOne({ studentId });
  if (!prog) prog = new Progress({ studentId, completedLessons: [], scores: {} });
  prog.scores[assignmentId] = score;
  await prog.save();
  res.json(prog);
});

module.exports = router;
