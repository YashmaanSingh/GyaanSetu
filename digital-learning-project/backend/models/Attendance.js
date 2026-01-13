const mongoose = require('mongoose');

const attendanceSchema = new mongoose.Schema({
  date: {
    type: Date,
    required: true
  },
  classId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Class',
    required: true
  },
  records: [{
    studentId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'User'
    },
    status: {
      type: String,
      enum: ['Present', 'Absent', 'Late'],
      default: 'Present'
    }
  }]
}, {
  timestamps: true
});

// Ensure only one attendance record per class per day
attendanceSchema.index({ date: 1, classId: 1 }, { unique: true });

module.exports = mongoose.model('Attendance', attendanceSchema);
