const mongoose = require('mongoose');

const resourceSchema = new mongoose.Schema({
  title: String,
  url: String,
  uploadedBy: mongoose.Types.ObjectId
});

module.exports = mongoose.model('Resource', resourceSchema);
