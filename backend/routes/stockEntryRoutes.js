

// routes/stockEntryRoutes.js
const express = require('express');
const router = express.Router();
const stockEntryController = require('../controllers/stockEntryController');

// Define routes
router.post('/entries', stockEntryController.createEntry);
router.get('/entries', stockEntryController.getAllEntries);
router.get('/report', stockEntryController.getStockReport);
router.put('/entries/:id', stockEntryController.updateEntry);
router.get('/entries/:id', stockEntryController.getEntryById);
router.delete('/entries/:id', stockEntryController.deleteEntry);

module.exports = router;
