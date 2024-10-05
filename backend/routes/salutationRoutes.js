




const express = require('express');
const router = express.Router();
const salutationController = require('../controllers/salutationController');

// Route to create a salutation
router.post('/salutation', salutationController.createSalutation);

// Route to get all salutations
router.get('/salutations', salutationController.getAllSalutations);

// Route to get a salutation by ID
router.get('/salutation/:salutationId', salutationController.getSalutation);

// Route to update a salutation by ID
router.put('/salutation/:salutationId', salutationController.updateSalutation);

// Route to delete a salutation by ID
router.delete('/salutation/:salutationId', salutationController.deleteSalutation);

module.exports = router;
