
const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const contactSchema = new Schema({
  number: { type: String, required: true },
  name: { type: String, required: false }, // Optional name field
});

const bankDetailSchema = new Schema({
  accountNumber: { type: String, required: true },
  firmName: { type: String, required: true },
  bankName: { type: String, required: true },
  ifscCode: { type: String, required: true },
});

const supplierSchema = new Schema(
  {
    partyName: { type: String, required: true },
    firstName: { type: String, required: false },
    lastName: { type: String, required: false },
    area: { type: String, required: true },
    partyCode: { type: String, required: true, unique: true },
    openingBalance: {
      amount: { type: Number, required: true },
      type: { type: String, enum: ["credit", "debit"], required: true },
    },
    address: {
      houseNumber: { type: String, required: true },
      streetName: { type: String, required: true },
      landmark: { type: String, required: false },
      crossRoad: { type: String, required: false },
      locality: { type: String, required: true },
      relatedLocation: { type: String, required: false },
      pinCode: { type: String, required: false },
    },
    contactNumbers: [contactSchema], // Array of contact schemas
    bankDetails: [bankDetailSchema], // Array of bank detail schemas
    associatedCounter: { type: String, required: false },
    associatedSalesman: { type: String, required: false },
  },
  { timestamps: true }
);

module.exports = mongoose.model("Supplier", supplierSchema);
