const mongoose = require('mongoose');

const subjectSchema = new mongoose.Schema({
    name: {
        type: String, // e.g., "Mathematics", "English"
        required: true,
        trim: true
    },
    classId: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Class',
        required: true
    },
    teacherId: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'User' // Assign a specific teacher to this subject for this class
    }
}, {
    timestamps: true
});

module.exports = mongoose.model('Subject', subjectSchema);
