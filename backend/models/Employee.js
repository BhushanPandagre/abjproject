const mongoose = require("mongoose");

const employeeSchema = new mongoose.Schema({
  name: { type: String, required: true },
  email: { type: String, required: true, unique: true },
  position: { type: String, required: true },
  department: { type: mongoose.Schema.Types.ObjectId, ref: 'Department', required: true },
  dateOfHire: { type: Date, required: true },
  salary: { type: Number, required: true },
  image: { type: String },
});

module.exports = mongoose.model("Employee", employeeSchema);
