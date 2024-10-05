const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const JewelryItemSchema = new Schema({
  name: { type: String, required: true }, // Removed unique: true
  printname: { type: String },
  itemType: { type: String },
  mainUnitBarcode: { type: String, unique: true, required: true },
  alternativeUnitBarcode: { type: String, unique: true, required: true },
  group: { type: Schema.Types.ObjectId, ref: 'Group' },
  category: { type: String },
  description: { type: String },
  unit: { type: Schema.Types.ObjectId, ref: 'Unit' },
  alternativeunit: { type: String },
  packagingUnit: { type: String },
  selectedConversion: { type: String },
  conversionFactor: { type: Number, default: 1 },
  // quantity: { type: Number },
  quantity: {
    type: Number,
    default: 0
  },
  retailerPrice: { type: Number },
  semiWholesellerPrice: { type: Number },
  wholesellerPrice: { type: Number },
  minSalePrice: { type: Number },
  alternativeSemiWholesellerPrice: { type: Number },
  alternativeWholesellerPrice: { type: Number },
  alternativeRetailerPrice: { type: Number },
  openingStock: { type: Number },
  altOpeningStock: { type: Number },
  gst: { type: Schema.Types.ObjectId, ref: 'GST' }, // Reference to GST model
  HSNCode: { type: Number },
  images: [String],
});



const JewelryItem = mongoose.model('JewelryItem', JewelryItemSchema);
module.exports = JewelryItem;
