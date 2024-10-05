

// models/StockEntry.js
const mongoose = require('mongoose');

const stockEntrySchema = new mongoose.Schema({
  date: { type: Date, required: true },
  item: { type: String, required: true },
  quantity: { type: Number, required: true },
  price: { type: Number, required: true },
  amount: { type: Number, required: true }, // Calculated as quantity * price
  unit: { type: String, required: true },   // E.g., kg, liters, units
  itemsConsumed: { type: Number, default: 0 }, // Number of items consumed if applicable
  shortNarration: { type: String }, // Brief description or note
  voucherNumber: { type: String, unique: true, required: true }, // Unique identifier for transactions
});

module.exports = mongoose.model('StockEntry', stockEntrySchema);
