

const CashFlow = require('../models/cashFlowModel');
// Get all cash flows
exports.getCashFlows = async (req, res) => {
  try {
    const cashFlows = await CashFlow.find();
    res.json(cashFlows);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// Add a new cash flow
exports.addCashFlow = async (req, res) => {
  const { name , description, amount, type, date } = req.body;
  // Check if file is uploaded
  const fileUrl = req.file ? `uploads/${req.file.filename}` : null; // Adjust according to your storage service

  const newCashFlow = new CashFlow({
    name,
    description,
    amount,
    type,
    date,
    fileUrl
  });

  try {
    const savedCashFlow = await newCashFlow.save();
    res.status(201).json(savedCashFlow);
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
};

// Update a cash flow
exports.updateCashFlow = async (req, res) => {
  const { id } = req.params;
  const { name , description, amount, type, date } = req.body;
  // Check if file is uploaded
  const fileUrl = req.file ? `uploads/${req.file.filename}` : null;

  try {
    const updatedCashFlow = await CashFlow.findByIdAndUpdate(id, { name , description, amount, type, date, fileUrl }, { new: true });
    if (!updatedCashFlow) return res.status(404).json({ message: 'Cash Flow not found' });
    res.json(updatedCashFlow);
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
};

// Delete a cash flow
exports.deleteCashFlow = async (req, res) => {
  const { id } = req.params;
  try {
    const deletedCashFlow = await CashFlow.findByIdAndDelete(id);
    if (!deletedCashFlow) return res.status(404).json({ message: 'Cash Flow not found' });
    res.json({ message: 'Cash Flow deleted successfully' });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};
