// routes/assignments.js
const express = require("express");
const router = express.Router();
const Assignment = require("../models/Assignment");

// Get all assignments
router.get("/", async (req, res) => {
  const assignments = await Assignment.find();
  res.json(assignments);
});

// Add a new assignment
router.post("/", async (req, res) => {
  const { title, questions } = req.body; // questions: [{q, options: [], answer}]
  const assignment = new Assignment({ title, questions });
  await assignment.save();
  res.json(assignment);
});

// Submit answers
router.post("/submit", async (req, res) => {
  const { studentId, assignmentId, answers } = req.body;
  const assignment = await Assignment.findById(assignmentId);
  const score = assignment.questions.reduce((acc, q, i) => acc + (q.answer === answers[i] ? 1 : 0), 0);
  res.json({ score, total: assignment.questions.len
