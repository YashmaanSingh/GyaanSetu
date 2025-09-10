import express from 'express';
import Student from '../models/Student.js';
const router = express.Router();

router.get('/', async (req, res) => {
  const students = await Student.find();
  res.json(students);
});

router.post('/', async (req, res) => {
  const student = new Student(req.body);
  await student.save();
  res.json(student);
});

export default router;
