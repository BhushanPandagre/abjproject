


// controllers/stockEntryController.js
const StockEntry = require('../models/StockEntry');


// Create a new stock entry
exports.createEntry = async (req, res) => {
  try {
    const { date, item, quantity, price, amount, unit, itemsConsumed, shortNarration, voucherNumber } = req.body;

    // Validate the amount based on quantity and price
    if (amount !== quantity * price) {
      return res.status(400).json({ error: 'Amount must be equal to quantity multiplied by price' });
    }

    const entry = new StockEntry({
      date, item, quantity, price, amount, unit, itemsConsumed, shortNarration, voucherNumber
    });

    await entry.save();
    res.status(201).json(entry);
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
};

// controllers/stockEntryController.js
exports.getEntryById = async (req, res) => {
  try {
    const entry = await StockEntry.findById(req.params.id);
    if (!entry) {
      return res.status(404).json({ error: 'Entry not found' });
    }
    res.status(200).json(entry);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};



// Get all stock entries
exports.getAllEntries = async (req, res) => {
  try {
    const entries = await StockEntry.find();
    res.status(200).json(entries);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};




// Update a stock entry by ID
exports.updateEntry = async (req, res) => {
  try {
    const { id } = req.params;
    const updatedData = req.body;

    // Validate the amount if it’s being updated
    if (updatedData.amount && updatedData.quantity && updatedData.price) {
      if (updatedData.amount !== updatedData.quantity * updatedData.price) {
        return res.status(400).json({ error: 'Amount must be equal to quantity multiplied by price' });
      }
    }

    const entry = await StockEntry.findByIdAndUpdate(id, updatedData, { new: true });
    if (!entry) return res.status(404).json({ error: 'Entry not found' });
    res.status(200).json(entry);
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
};




// Delete a stock entry by ID
exports.deleteEntry = async (req, res) => {
  try {
    const { id } = req.params;
    const entry = await StockEntry.findByIdAndDelete(id);
    if (!entry) return res.status(404).json({ error: 'Entry not found' });
    res.status(204).end();
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

// Get stock report
exports.getStockReport = async (req, res) => {
  try {
    const entries = await StockEntry.find();

    // Calculate totals
    const totalQuantity = entries.reduce((sum, entry) => sum + entry.quantity, 0);
    const totalAmount = entries.reduce((sum, entry) => sum + entry.amount, 0);
    const totalItemsConsumed = entries.reduce((sum, entry) => sum + (entry.itemsConsumed || 0), 0);

    res.json({
      totalQuantity,
      totalAmount,
      totalItemsConsumed
    });
  } catch (error) {
    res.status(500).json({ message: 'Error fetching report data', error });
  }
};