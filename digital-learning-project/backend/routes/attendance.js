const router = require('express').Router();
const Attendance = require('../models/Attendance');

// Get attendance
router.get('/', async (req,res)=>{
  const records = await Attendance.find();
  res.json(records);
});

// Mark attendance
router.post('/', async (req,res)=>{
  const record = new Attendance(req.body);
  await record.save();
  res.json(record);
});

module.exports = router;
