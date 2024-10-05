const mongoose = require("mongoose");

const purchasePaymentSchema = new mongoose.Schema(
  {
    supplierName: { type: String, required: true },
    companyName: { type: String, required: true },
    voucherNumber: { type: Number, required: true },
    amount: { type: Number, required: true },
    paymentDate: { type: Date, required: true },
    paymentMethod: { type: String, required: true },
    notes: { type: String },
    purchaseId: { type: mongoose.Schema.Types.ObjectId, ref: "Purchase" }, // Add this field
  },
  {
    timestamps: true, // Automatically add createdAt and updatedAt fields
  }
);

module.exports = mongoose.model("PurchasePayment", purchasePaymentSchema);
