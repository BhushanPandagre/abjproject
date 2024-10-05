const PurchasePayment = require('../models/PurchasePayment');

// Create a new payment
exports.createPayment = async (req, res) => {
  try {
    const payment = new PurchasePayment(req.body);
    await payment.save();
    res.status(201).json(payment);
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
};

// Get all payments
exports.getAllPayments = async (req, res) => {
  try {
    const payments = await PurchasePayment.find();
    res.status(200).json(payments);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

// Get a single payment by ID
exports.getPaymentById = async (req, res) => {
    try {
      const payment = await PurchasePayment.findById(req.params.id);
      if (!payment) return res.status(404).json({ message: 'Payment not found' });
      res.status(200).json(payment); // Date should be in ISO format
    } catch (error) {
      res.status(500).json({ error: error.message });
    }
  };
  

// Update a payment by ID
exports.updatePayment = async (req, res) => {
  try {
    const payment = await PurchasePayment.findByIdAndUpdate(req.params.id, req.body, { new: true });
    if (!payment) return res.status(404).json({ message: 'Payment not found' });
    res.status(200).json(payment);
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
};

// Delete a payment by ID
exports.deletePayment = async (req, res) => {
  try {
    const payment = await PurchasePayment.findByIdAndDelete(req.params.id);
    if (!payment) return res.status(404).json({ message: 'Payment not found' });
    res.status(200).json({ message: 'Payment deleted successfully' });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};
