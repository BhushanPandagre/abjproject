
const mongoose = require('mongoose');
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const crypto = require('crypto');

const userSchema = new mongoose.Schema({
  username: {
      type: String,
      required: true
  },
  email: {
      type: String,
      required: true,
      unique: true
  },
  password: {
      type: String,
      required: true
  },
  // otp: String, // New field for OTP
  // otpExpiration: Date, // New field for OTP expiration time
  otp: {
    type:String, 
  }, 
  otpExpiration: {
    type:Date, 
  },

  role: {
    type: String,
    required: true,
    validate: {
      validator: async function(value) {
        if (this.isNew && !['admin', 'sub-admin', 'cashier', 'user'].includes(value)) {
          // Check if the role is a valid ObjectId (for CustomRole)
          if (!mongoose.Types.ObjectId.isValid(value)) {
            return false;
          }
        }
        return true;
      },
      message: props => `${props.value} is not a valid role`,
    },
  },
  permissions: [{
      type: String,
      enum: ['create', 'read', 'modified', 'delete'] // Define your specific permissions here
  }],
  resetToken: String,
  resetTokenExpiration: Date
});


userSchema.methods.generateResetToken = async function() {
    const resetToken = crypto.randomBytes(20).toString('hex');
    const resetTokenExpiration = Date.now() + 3600000; // Token valid for 1 hour
    this.resetToken = resetToken;
    this.resetTokenExpiration = resetTokenExpiration;
    await this.save();
    return resetToken;
};


 module.exports = mongoose.model('User', userSchema);




