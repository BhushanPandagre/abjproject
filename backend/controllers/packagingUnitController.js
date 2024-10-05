// controllers/packagingUnitController.js

const PackagingUnit = require('../models/packagingUnit');

// Get all packaging units
exports.getPackagingUnits = async (req, res) => {
  try {
    const packagingUnits = await PackagingUnit.find();
    res.json(packagingUnits);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// Get a single packaging unit
exports.getPackagingUnitById = async (req, res) => {
  try {
    const packagingUnit = await PackagingUnit.findById(req.params.id);
    if (packagingUnit) {
      res.json(packagingUnit);
    } else {
      res.status(404).json({ message: 'Packaging unit not found' });
    }
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// Create a new packaging unit
exports.createPackagingUnit = async (req, res) => {
  const packagingUnit = new PackagingUnit({
    name: req.body.name,
    description: req.body.description,
    // Add more fields as needed
  });

  try {
    const newPackagingUnit = await packagingUnit.save();
    res.status(201).json(newPackagingUnit);
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
};

// Update a packaging unit
exports.updatePackagingUnit = async (req, res) => {
  try {
    const packagingUnit = await PackagingUnit.findById(req.params.id);
    if (packagingUnit) {
      packagingUnit.name = req.body.name;
      packagingUnit.description = req.body.description;
      // Update more fields as needed

      const updatedPackagingUnit = await packagingUnit.save();
      res.json(updatedPackagingUnit);
    } else {
      res.status(404).json({ message: 'Packaging unit not found' });
    }
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
};

exports.deletePackagingUnit = async (req, res) => {
  try {
    console.log(`Delete request received for ID: ${req.params.id}`); // Log the ID received

    const packagingUnit = await PackagingUnit.findByIdAndDelete(req.params.id);
    if (packagingUnit) {
      res.json({ message: 'Packaging unit deleted' });
    } else {
      res.status(404).json({ message: 'Packaging unit not found' });
    }
  } catch (error) {
    console.error('Error deleting packaging unit:', error); // Log the error details
    res.status(500).json({ message: 'Internal server error' });
  }
};