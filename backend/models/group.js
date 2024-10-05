


// const mongoose = require('mongoose');

// const groupSchema = new mongoose.Schema({
//   name: { type: String, required: true },
//   underGroup: { type: Boolean, default: false }
// });

// const Group = mongoose.model('Group', groupSchema);

// module.exports = Group;




const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const groupSchema = new Schema({
  name: { type: String, required: true },
  jewelryItems: [{ type: Schema.Types.ObjectId, ref: 'JewelryItem' }] // Reference to JewelryItem model
});

const Group = mongoose.model('Group', groupSchema);
module.exports = Group;