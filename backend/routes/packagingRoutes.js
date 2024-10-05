const express = require('express');
const router = express.Router();
const packagingController = require('../controllers/packagingController');

// Create a new packaging record
router.post('/packaging', packagingController.createPackaging);

// Get all packaging records
router.get('/packaging', packagingController.getAllPackaging);

// Get a single packaging record by ID
router.get('/packaging/:id', packagingController.getPackagingById);

// Update a packaging record by ID
router.put('/packaging/:id', packagingController.updatePackaging);

// Delete a packaging record by ID
router.delete('/packaging/:id', packagingController.deletePackaging);

module.exports = router;
