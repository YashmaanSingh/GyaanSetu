// routes/lessons.js
const express = require("express");
const router = express.Router();
const Lesson = require("../models/Lesson");

// Get all lessons
router.get("/", async (req, res) => {
  const lessons = await Lesson.find();
  res.json(lessons);
});

// Upload lesson/resource
router.post("/", async (req, res) => {
  const { title, minutes } = req.body;
  const lesson = new Lesson({ title, minutes });
  await lesson.save();
  res.json(lesson);
});

module.exports = router;
