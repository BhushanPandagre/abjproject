// routes/supplierRoutes.js

const express = require("express");
const router = express.Router();
const supplierController = require("../controllers/supplierController");

// Get all suppliers
router.get("/", supplierController.getAllSuppliers);

// Get a single supplier by ID
router.get("/:id", supplierController.getSupplierById);

// Create a new supplier
router.post("/", supplierController.createSupplier);

// Update a supplier by ID
router.put("/:id", supplierController.updateSupplier);

// Delete a supplier by ID
router.delete("/:id", supplierController.deleteSupplier);

module.exports = router;
