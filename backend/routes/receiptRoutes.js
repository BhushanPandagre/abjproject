
const express = require('express');
const router = express.Router();
const receiptController = require('../controllers/receiptController');

// Define routes
router.post('/receipts', receiptController.createReceipt);
router.get('/receipts', receiptController.getAllReceipts);
router.get('/receipts/:id', receiptController.getReceiptById);
router.put('/receipts/:id', receiptController.updateReceipt);
router.delete('/receipts/:id', receiptController.deleteReceipt);

module.exports = router;