const mongoose = require("mongoose");

const packagingDetailSchema = new mongoose.Schema({
  boxNumber: { type: Number, required: true },
  itemCount: { type: Number, required: true },
  totalPieces: { type: Number, required: true },
});

const packagingSchema = new mongoose.Schema({
  item: { type: String, },
  companyName: { type: String, required: true },
  supplierName: { type: String, required: true },
  purchaseVoucherNo: { type: String, },
  quantity: { type: Number, required: true },
  unit: { type: String, required: true },
  alternativeunit: { type: String, required: true },
  price: { type: Number, required: true },
  amount: { type: Number, required: true },
  packagingDetails: {
    boxCount: { type: Number, required: true },
    boxDetails: [packagingDetailSchema],
  },
  totalBoxes: { type: Number, required: true },
  totalPieces: { type: Number, required: true },
});

module.exports = mongoose.model("Packaging", packagingSchema);





//============================================================//
