const mongoose = require('mongoose');

const classSchema = new mongoose.Schema({
    name: {
        type: String,
        required: true,
        unique: true, // e.g., "Class 10", "Nursery"
        trim: true
    },
    section: {
        type: String, // e.g., "A", "B", or can be left empty if not using sections strictly yet
        trim: true
    },
    stream: {
        type: String, // e.g., "Science", "Commerce", "Arts" - mostly for Class 11/12
        trim: true
    },
    subjects: [{
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Subject'
    }]
}, {
    timestamps: true
});

module.exports = mongoose.model('Class', classSchema);
