

// const Receipt = require('../models/Receipt');
const Receipt = require("../models/Reciept")
// Create a new receipt
exports.createReceipt = async (req, res) => {
  try {
    const receipt = new Receipt(req.body);
    await receipt.save();
    res.status(201).json(receipt);
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
};

// Get all receipts
exports.getAllReceipts = async (req, res) => {
  try {
    const receipts = await Receipt.find();
    res.status(200).json(receipts);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// Get a single receipt by ID
exports.getReceiptById = async (req, res) => {
  try {
    const receipt = await Receipt.findById(req.params.id);
    if (!receipt) {
      return res.status(404).json({ message: 'Receipt not found' });
    }
    res.status(200).json(receipt);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// Update a receipt by ID
exports.updateReceipt = async (req, res) => {
  try {
    const receipt = await Receipt.findByIdAndUpdate(req.params.id, req.body, { new: true, runValidators: true });
    if (!receipt) {
      return res.status(404).json({ message: 'Receipt not found' });
    }
    res.status(200).json(receipt);
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
};

// Delete a receipt by ID
exports.deleteReceipt = async (req, res) => {
  try {
    const receipt = await Receipt.findByIdAndDelete(req.params.id);
    if (!receipt) {
      return res.status(404).json({ message: 'Receipt not found' });
    }
    res.status(204).send();
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};
