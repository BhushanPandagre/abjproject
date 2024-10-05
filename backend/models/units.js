const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const unitSchema = new Schema({
  name: {
    type: String,
    required: true,
    unique: true,
  },
  jewelryItems: [{ type: Schema.Types.ObjectId, ref: 'JewelryItem' }]
});

const Unit = mongoose.model('Unit', unitSchema);
module.exports = Unit;
