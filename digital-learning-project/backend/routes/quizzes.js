const express = require('express');
const router = express.Router();
const Quiz = require('../models/Quiz');
const protect = require('../middleware/authMiddleware');

// GET quizzes
router.get('/', protect, async (req,res)=>{
  const quizzes = await Quiz.find();
  res.json(quizzes);
});

// POST add quiz (teacher/admin)
router.post('/', protect, async (req,res)=>{
  if(req.user.role==='teacher' || req.user.role==='admin'){
    const {title, questions} = req.body;
    const q = await Quiz.create({title, questions});
    res.json(q);
  } else res.status(403).json({msg:'Not authorized'});
});

module.exports = router;
