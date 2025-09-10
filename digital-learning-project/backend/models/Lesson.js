const mongoose = require('mongoose');

const lessonSchema = new mongoose.Schema({
  title: String,
  minutes: Number
});

module.exports = mongoose.model('Lesson', lessonSchema);
