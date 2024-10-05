// server/models/Salutation.js
const mongoose = require('mongoose');

const salutationSchema = new mongoose.Schema({
  salutation: {
    type: String,
    required: true, // Ensure that salutation is provided
  },
  // other fields if needed
});

// Create and export the Salutation model
module.exports = mongoose.model('Salutation', salutationSchema);
