// const express = require('express');
// const router = express.Router();
// const saleVoucherController = require('../controllers/saleVoucherController');

// router.post('/add', saleVoucherController.createSaleVoucher);
// router.get('/', saleVoucherController.getAllSaleVouchers);
// router.get('/:id', saleVoucherController.getSaleVoucherById);
// router.put('/:id', saleVoucherController.updateSaleVoucher);
// router.delete('/:id', saleVoucherController.deleteSaleVoucher);

// // router.get("/get-next-sales-voucher-no",saleVoucherController.getNextSalesVoucherNo);

// module.exports = router;


const express = require("express");
const router = express.Router();
const saleVoucherController = require("../controllers/saleVoucherController");

const {
  createSaleVoucher,
  getAllSaleVouchers,
  getSaleVoucherById,
  updateSaleVoucher,
  deleteSaleVoucher,
  getNextSalesVoucherNo,
} = saleVoucherController;

// Route definitions
router.post("/sale-vouchers/add", createSaleVoucher); // Endpoint for creating a new sale voucher
router.get("/sale-vouchers", getAllSaleVouchers); // Endpoint for fetching all sale vouchers
router.get("/sale-vouchers/:id", getSaleVoucherById); // Endpoint for fetching a specific sale voucher by ID
router.put("/sale-vouchers/:id", updateSaleVoucher); // Endpoint for updating a specific sale voucher by ID
router.delete("/sale-vouchers/:id", deleteSaleVoucher); // Endpoint for deleting a specific sale voucher by ID

router.get("/get-next-sales-voucher-no", getNextSalesVoucherNo); // Endpoint for getting the next sales voucher number

module.exports = router;

