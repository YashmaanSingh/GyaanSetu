const mongoose = require('mongoose');

const attendanceSchema = new mongoose.Schema({
  studentId: mongoose.Types.ObjectId,
  date: String,
  present: Boolean
});

module.exports = mongoose.model('Attendance', attendanceSchema);
