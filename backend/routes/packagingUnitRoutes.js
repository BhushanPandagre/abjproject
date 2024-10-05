// routes/packagingUnitRoutes.js
const express = require('express');
const router = express.Router();
const packagingUnitController = require('../controllers/packagingUnitController');
// GET all packaging units
router.get('/', packagingUnitController.getPackagingUnits);
// GET a single packaging unit by ID
router.get('/:id', packagingUnitController.getPackagingUnitById);
// POST create a new packaging unit
router.post('/', packagingUnitController.createPackagingUnit);
// PUT update a packaging unit by ID
router.put('/:id', packagingUnitController.updatePackagingUnit);
// DELETE a packaging unit by ID
router.delete('/:id', packagingUnitController.deletePackagingUnit);

module.exports = router;
