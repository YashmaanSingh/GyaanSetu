// models/Assignment.js
const mongoose = require('mongoose');

const QuestionSchema = new mongoose.Schema({
  id: Number,
  question: String,
  options: [String],
  answer: String
});

const AssignmentSchema = new mongoose.Schema({
  title: String,
  questions: [QuestionSchema],
  createdAt: { type: Date, default: Date.now }
});

module.exports = mongoose.model('Assignment', AssignmentSchema);
