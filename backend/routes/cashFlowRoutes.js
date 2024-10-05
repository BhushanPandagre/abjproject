
const express = require('express');
const router = express.Router();
const multer = require('multer');
const path = require('path');
const cashFlowController = require('../controllers/cashFlowController');

// Configure multer for file uploads
const storage = multer.diskStorage({
  destination: (req, file, cb) => {
    cb(null, 'uploads/'); // Folder to store uploaded files
  },
  filename: (req, file, cb) => {
    cb(null, Date.now() + path.extname(file.originalname)); // Create a unique filename
  }
});

const upload = multer({ storage: storage });

// Get all cash flows
router.get('/', cashFlowController.getCashFlows);

// Add a new cash flow with file upload
router.post('/', upload.single('file'), cashFlowController.addCashFlow);

// Update a cash flow with file upload
router.put('/:id', upload.single('file'), cashFlowController.updateCashFlow);

// Delete a cash flow
router.delete('/:id', cashFlowController.deleteCashFlow);

module.exports = router;
