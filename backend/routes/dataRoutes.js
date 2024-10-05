const express = require('express');
const router = express.Router();
const dataController = require('../controllers/dataController');

// Route to create a new document
router.post('/', dataController.createData);

// Route to fetch all documents
router.get('/', dataController.getAllData);

// Route to fetch a single document by ID
router.get('/:id', dataController.getDataById);

// Route to update a document by ID
router.put('/:id', dataController.updateData);

// Route to delete a document by ID
router.delete('/:id', dataController.deleteData);

module.exports = router;
