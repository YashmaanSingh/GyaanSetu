import express from 'express';
import Announcement from '../models/Announcement.js';

const router = express.Router();

// Get all announcements
router.get('/', async (req, res) => {
  try {
    const anns = await Announcement.find().sort({ date: -1 });
    res.json(anns);
  } catch (err) {
    res.status(500).json({ error: 'Failed to fetch announcements' });
  }
});

// Create a new announcement
router.post('/', async (req, res) => {
  try {
    const { title, content, creator } = req.body;
    const newAnn = new Announcement({ title, content, creator });
    await newAnn.save();
    res.status(201).json(newAnn);
  } catch (err) {
    res.status(500).json({ error: 'Failed to create announcement' });
  }
});

export default router;
