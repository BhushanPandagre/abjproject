

const express = require('express');
const router = express.Router();
const areaController = require('../controllers/areaController');
// const errorMiddleware = require('./middleware/errorMiddleware');

// Route to add a new area
router.post('/', areaController.createArea);

// Route to get all areas
router.get('/', areaController.getAllAreas);

// Route to get a specific area by ID
router.get('/:id', areaController.getAreaById);

// Route to update an area
router.put('/:id', areaController.updateArea);

// Route to delete an area
router.delete('/:id', areaController.deleteArea);

module.exports = router;
