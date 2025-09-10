const mongoose = require('mongoose');

const quizSchema = new mongoose.Schema({
  title: String,
  questions: [
    {
      q: String,
      opts: [String],
      answer: Number
    }
  ]
},{timestamps:true});

module.exports = mongoose.model('Quiz', quizSchema);
