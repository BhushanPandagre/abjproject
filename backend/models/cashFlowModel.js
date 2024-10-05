const mongoose = require('mongoose');

const cashFlowSchema = new mongoose.Schema({
  name: { type: String, required: true },
  description: { type: String, required: true },
  amount: { type: Number, required: true },
  type: { type: String, enum: ['income', 'expense'], required: true },
  date: { type: Date, default: Date.now },
  fileUrl: { type: String } // Added field for storing the file URL
});

module.exports = mongoose.model('CashFlow', cashFlowSchema);