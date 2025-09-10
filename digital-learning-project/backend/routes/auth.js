const express = require('express');
const router = express.Router();
const User = require('../models/User');
const jwt = require('jsonwebtoken');
const bcrypt = require('bcryptjs');

// Register
router.post('/register', async (req,res)=>{
  const {name,email,password,role} = req.body;
  try {
    const exists = await User.findOne({email});
    if(exists) return res.status(400).json({msg:'User already exists'});
    const user = await User.create({name,email,password,role});
    const token = jwt.sign({id:user._id, role:user.role}, process.env.JWT_SECRET,{expiresIn:'7d'});
    res.json({token,user:{id:user._id,name:user.name,role:user.role}});
  } catch(err){ res.status(500).json({msg:err.message}); }
});

// Login
router.post('/login', async (req,res)=>{
  const {email,password} = req.body;
  try {
    const user = await User.findOne({email});
    if(!user) return res.status(400).json({msg:'Invalid credentials'});
    const isMatch = await bcrypt.compare(password, user.password);
    if(!isMatch) return res.status(400).json({msg:'Invalid credentials'});
    const token = jwt.sign({id:user._id, role:user.role}, process.env.JWT_SECRET,{expiresIn:'7d'});
    res.json({token,user:{id:user._id,name:user.name,role:user.role}});
  } catch(err){ res.status(500).json({msg:err.message}); }
});

module.exports = router;
