// const mongoose = require('mongoose');

// const counterSchema = new mongoose.Schema({
//   _id: String, // e.g., "purchase-voucher-2024"
//   sequence_value: { type: Number, default: 0 }
// });

// const Counter = mongoose.model('Counter', counterSchema);

// module.exports = Counter;

// const mongoose = require('mongoose');

// const counterSchema = new mongoose.Schema({
//   _id: String, // e.g., "purchase-voucher-2024"
//   sequence_value: { type: Number, default: 0 }
// });

// const Counter = mongoose.model('Counter', counterSchema);

// module.exports = Counter;

const mongoose = require('mongoose');

const counterSchema = new mongoose.Schema({
  year: { type: Number, required: true },
  serial: { type: Number, default: 0 }
});

const Counter = mongoose.model('Counter', counterSchema);

module.exports = Counter;



