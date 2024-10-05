// const express = require("express");
// const router = express.Router();

// const {
//   createJewelryItem,
//   getAllJewelryItems,
//   getJewelryItemById,
//   searchJewelryItems,
//   updateJewelryItem,
//   deleteJewelryItem,
// } = require("../controllers/jewelryController");

// // Route definitions
// router.post("/jewelry-items", createJewelryItem); // Endpoint for creating a jewelry item
// router.get("/jewelry-items", getAllJewelryItems); // Endpoint for fetching all jewelry items
// router.get("/jewelry-items/:id", getJewelryItemById); // Endpoint for fetching a jewelry item by ID
// router.get("/jewelry-items/search", searchJewelryItems); // Endpoint for searching jewelry items
// router.delete("/jewelry-items/:id", deleteJewelryItem); // Endpoint for deleting a jewelry item by ID

// router.put("/jewelry-items/:id", updateJewelryItem);
// module.exports = router;





const express = require('express');
const router = express.Router();
const multer = require('multer');
const {
  createJewelryItem,
  getAllJewelryItems,
  getJewelryItemById,
  searchJewelryItems,
  updateJewelryItem,
  deleteJewelryItem,
  deleteImage,
  translateText,
} = require('../controllers/jewelryController');

// Set up multer for file uploads
const storage = multer.diskStorage({
  destination: (req, file, cb) => {
    cb(null, 'uploads/');
  },
  filename: (req, file, cb) => {
    cb(null, `${Date.now()}-${file.originalname}`);
  }
});


const upload = multer({ storage });

// Route definitions
router.post('/jewelry-items', upload.array('images'), createJewelryItem); // Endpoint for creating a jewelry item
router.get('/jewelry-items', getAllJewelryItems); // Endpoint for fetching all jewelry items
router.get('/jewelry-items/:id', getJewelryItemById); // Endpoint for fetching a jewelry item by ID
router.get('/jewelry-items/search', searchJewelryItems); // Endpoint for searching jewelry items
router.delete('/jewelry-items/:id', deleteJewelryItem); // Endpoint for deleting a jewelry item by ID
router.delete('/jewelry-items/:id/images', deleteImage);
router.post('/translate', translateText);
router.put('/jewelry-items/:id', upload.array('images', 10), updateJewelryItem);
module.exports = router;



