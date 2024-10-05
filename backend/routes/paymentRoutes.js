const express = require('express');
const router = express.Router();
const paymentController = require('../controllers/paymentController');

// Routes for managing purchase payments
router.post('/payments', paymentController.createPayment);
router.get('/payments', paymentController.getAllPayments);
router.get('/payments/:id', paymentController.getPaymentById);
router.put('/payments/:id', paymentController.updatePayment);
router.delete('/payments/:id', paymentController.deletePayment);

module.exports = router;
