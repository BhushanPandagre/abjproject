const mongoose = require('mongoose');

const customRoleSchema = new mongoose.Schema({
  name: { type: String, required: true, unique: true },
  permissions: [{ type: String, enum: ['create', 'read', 'update', 'delete'] }],
  user: { type: mongoose.Schema.Types.ObjectId, ref: 'User' }
 
  // You can add more fields as needed
});

module.exports = mongoose.model('CustomRole', customRoleSchema);
