const mongoose = require('mongoose');

const progressSchema = new mongoose.Schema({
  studentId: mongoose.Types.ObjectId,
  lessonId: mongoose.Types.ObjectId,
  completed: Boolean
});

module.exports = mongoose.model('Progress', progressSchema);
