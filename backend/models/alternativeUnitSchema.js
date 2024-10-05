const mongoose = require('mongoose');

const alternativeUnitSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true
  }
});

module.exports = mongoose.model('AlternativeUnit', alternativeUnitSchema);
