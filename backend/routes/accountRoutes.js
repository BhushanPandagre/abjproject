
const express = require('express');
const router = express.Router();
const multer = require('multer');
const path = require('path');
const accountController = require('../controllers/accountController');

// Configure multer storage
const storage = multer.diskStorage({
  destination: (req, file, cb) => {
    cb(null, 'uploads/');
  },
  filename: (req, file, cb) => {
    cb(null, `${Date.now()}-${file.originalname}`);
  }
});

// Initialize multer upload
// const upload = multer({ storage: storage, fileFilter: fileFilter });
const upload = multer({ storage: storage, });

// POST request to create a new account with image upload
router.post('/', upload.single('image'), accountController.createAccount);

// PUT request to update an account by ID with image upload
router.put('/:id', upload.single('image'), accountController.updateAccount);

// GET request to retrieve all accounts
router.get('/', accountController.getAllAccounts);

// GET request to retrieve an account by ID
router.get('/:id', accountController.getAccountById);

// DELETE request to delete an account by ID
router.delete('/:id', accountController.deleteAccount);

module.exports = router;
