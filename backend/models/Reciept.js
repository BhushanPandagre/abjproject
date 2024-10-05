const mongoose = require('mongoose');

const ReceiptSchema = new mongoose.Schema({

  receiptNumber: { type: String, required: true },
  paymentAmount: { type: Number, required: true },
  voucherNumber: { type: Number, required: true },
  paymentDate: { type: Date, required: true },
  paymentMethod: { type: String, required: true },
  notes: { type: String },
});

module.exports = mongoose.model('Receipt', ReceiptSchema);
