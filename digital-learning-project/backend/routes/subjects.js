const express = require('express');
const router = express.Router();
const db = require('../utils/mockMongoose');
const { protect, authorize } = require('../middleware/authMiddleware');

// Get subjects (optionally filter by classId)
router.get('/', protect, async (req, res) => {
    try {
        const { classId } = req.query;
        const subjects = await db.Subject.find(classId ? { classId } : {});
        res.json(subjects);
    } catch (err) {
        res.status(500).json({ msg: err.message });
    }
});

// Create subject (admin only)
router.post('/', protect, authorize('admin', 'teacher'), async (req, res) => {
    try {
        const { name, classId, teacherId } = req.body;
        const subject = await db.Subject.create({
            name,
            classId,
            teacherId: teacherId || null
        });

        // Update class to include this subject
        const classItem = await db.Class.findById(classId);
        if (classItem) {
            if (!classItem.subjects) classItem.subjects = [];
            classItem.subjects.push(subject._id);
            await classItem.save();
        }

        res.status(201).json(subject);
    } catch (err) {
        res.status(500).json({ msg: err.message });
    }
});

// Delete subject
router.delete('/:id', protect, authorize('admin'), async (req, res) => {
    try {
        const { id } = req.params;
        const subject = await db.Subject.findById(id);
        if (!subject) return res.status(404).json({ msg: 'Subject not found' });

        // Remove from class
        const classItem = await db.Class.findById(subject.classId);
        if (classItem && classItem.subjects) {
            classItem.subjects = classItem.subjects.filter(s => s !== id);
            await classItem.save();
        }

        // Delete subject
        const index = db.Subject.data.findIndex(s => s._id === id);
        if (index !== -1) {
            db.Subject.data.splice(index, 1);
        }

        res.json({ msg: 'Subject deleted successfully' });
    } catch (err) {
        res.status(500).json({ msg: err.message });
    }
});

module.exports = router;
