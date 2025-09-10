const router = require('express').Router();
const Resource = require('../models/Resource');

// Get all resources
router.get('/', async (req,res)=>{
  const r = await Resource.find();
  res.json(r);
});

// Upload resource
router.post('/', async (req,res)=>{
  const r = new Resource(req.body);
  await r.save();
  res.json(r);
});

module.exports = router;
