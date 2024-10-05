const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const GSTSchema = new Schema({
  name: { type: String },
  rate: { type: Number }
  // Add other fields as needed
});

const GST = mongoose.model('GST', GSTSchema);
module.exports = GST;
