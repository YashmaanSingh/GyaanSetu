// routes/users.js
const express = require("express");
const router = express.Router();
const User = require("../models/User");

// Get all users
router.get("/", async (req, res) => {
  const users = await User.find();
  res.json(users);
});

// Add new student/teacher/admin
router.post("/", async (req, res) => {
  const { name, role } = req.body;
  const user = new User({ name, role });
  await user.save();
  res.json(user);
});
