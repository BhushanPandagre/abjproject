// const express = require('express');
// const router = express.Router();
// // const { createPurchase, getPurchases, getPurchaseById, updatePurchaseById, deletePurchaseById,getNextVoucherNo,getNextPurchaseVoucherNo} = require('../controllers/purchaseController');
// const { createPurchase, getPurchases, getPurchaseById, updatePurchaseById, deletePurchaseById,getNextPurchaseVoucherNo} = require('../controllers/purchaseController');

// // Route definitions
// router.post('/purchases', createPurchase); // Endpoint for creating a new purchase
// router.get('/purchases', getPurchases); // Endpoint for fetching all purchases
// router.get('/purchases/:id', getPurchaseById); // Endpoint for fetching a specific purchase by ID
// router.put('/purchases/:id', updatePurchaseById); // Endpoint for updating a specific purchase by ID
// router.delete('/purchases/:id', deletePurchaseById); // Endpoint for deleting a specific purchase by ID
// // router.get('/get-next-voucher-no', getNextVoucherNo);
// router.get('/get-next-purchase-voucher-no', getNextPurchaseVoucherNo);

// module.exports = router;


//================================ Updated code =========================//

const express = require("express");
const router = express.Router();

const {
  createPurchase,
  getPurchases,
  getPurchaseById,
  updatePurchaseById,
  deletePurchaseById,
  getNextPurchaseVoucherNo,

} = require("../controllers/purchaseController");

// Route definitions
router.post("/purchases", createPurchase); // Endpoint for creating a new purchase
router.get("/purchases", getPurchases); // Endpoint for fetching all purchases
router.get("/purchases/:id", getPurchaseById); // Endpoint for fetching a specific purchase by ID
router.put("/purchases/:id", updatePurchaseById); // Endpoint for updating a specific purchase by ID
router.delete("/purchases/:id", deletePurchaseById); // Endpoint for deleting a specific purchase by ID

router.get("/get-next-purchase-voucher-no", getNextPurchaseVoucherNo);


module.exports = router;
