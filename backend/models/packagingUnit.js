// models/packagingUnit.js

const mongoose = require('mongoose');

const packagingUnitSchema = new mongoose.Schema({
  name: { type: String, required: true },
  description: { type: String },
  // Add more fields as needed
});

module.exports = mongoose.model('PackagingUnit', packagingUnitSchema);
