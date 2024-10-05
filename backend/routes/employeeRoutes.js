
const express = require('express');
const {
  getAllEmployees,
  createEmployee,
  updateEmployee,
  deleteEmployee,
  uploadImage,
} = require('../controllers/employeeController');

const router = express.Router();

router.get('/', getAllEmployees);
router.post('/', uploadImage, createEmployee);
router.put('/:id', uploadImage, updateEmployee);
router.delete('/:id', deleteEmployee);

module.exports = router;
