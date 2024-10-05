const mongoose = require('mongoose');

const salesSequenceSchema = new mongoose.Schema({
  year: { type: String, required: true },
  serial: { type: Number, default: 0 }
});

const SalesSequence = mongoose.model('SalesSequence', salesSequenceSchema);
module.exports = SalesSequence;
