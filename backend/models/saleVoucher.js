const mongoose = require("mongoose");

const saleVoucherSchema = new mongoose.Schema({
  buyerName: { type: String, required: true },
  saleDate: { type: Date, default: Date.now },
  saleVoucherNo:{ type: String, required: true, unique: true },
  sellerVoucherNo: { type: String, required: true },
  itemsList: [
    {
      item: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "JewelryItem",
        default: null,
      },
      quantity: {
        type: Number,
        default: 0,
      },
      unit: { type: String },
      alternativeunit: { type: String },
      price: { type: Number },
      amount: { type: Number }
    }
  ],
  packingCharges: { type: Number, default: 0 },
  gstExpenses: { type: Number, default: 0 },
  otherExpenses: { type: Number, default: 0 },
  totalItemAmount: { type: Number, default: 0 },
  billSundryAmount: { type: Number, default: 0 },
  totalAmount: { type: Number, default: 0 },
  accountId: { type: mongoose.Schema.Types.ObjectId, ref: 'Account' },
  transportDetails: {
    builtNumber: { type: Number, min: [0, "Built number cannot be negative"] },
    transporter: { type: String, required: true },
    date: { type: Date, default: Date.now },
    lotSize: { type: Number, min: [0, "Lot size cannot be negative"] },
    lotOpen: { type: Number, min: [0, "Lot open cannot be negative"] },
    lotPending: { type: Number, min: [0, "Lot pending cannot be negative"] },
  },
});

const SaleVoucher = mongoose.model("SaleVoucher", saleVoucherSchema);

module.exports = SaleVoucher;
