const express = require('express');
const router = express.Router();
const db = require('../utils/mockMongoose');
const { protect, authorize } = require('../middleware/authMiddleware');

// Get all classes
router.get('/', protect, async (req, res) => {
    try {
        const classes = await db.Class.find();
        res.json(classes);
    } catch (err) {
        res.status(500).json({ msg: err.message });
    }
});

// Create class (admin only)
router.post('/', protect, authorize('admin'), async (req, res) => {
    try {
        const { name, section, stream } = req.body;
        const newClass = await db.Class.create({
            name,
            section: section || '',
            stream: stream || '',
            subjects: []
        });
        res.status(201).json(newClass);
    } catch (err) {
        res.status(500).json({ msg: err.message });
    }
});

// Update class
router.put('/:id', protect, authorize('admin'), async (req, res) => {
    try {
        const { id } = req.params;
        const classItem = await db.Class.findById(id);
        if (!classItem) return res.status(404).json({ msg: 'Class not found' });

        Object.assign(classItem, req.body);
        await classItem.save();
        res.json(classItem);
    } catch (err) {
        res.status(500).json({ msg: err.message });
    }
});

// Delete class
router.delete('/:id', protect, authorize('admin'), async (req, res) => {
    try {
        const { id } = req.params;
        const index = db.Class.data.findIndex(c => c._id === id);
        if (index === -1) return res.status(404).json({ msg: 'Class not found' });

        db.Class.data.splice(index, 1);
        res.json({ msg: 'Class deleted successfully' });
    } catch (err) {
        res.status(500).json({ msg: err.message });
    }
});

module.exports = router;
