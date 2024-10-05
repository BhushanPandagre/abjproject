const Packaging = require('../models/Packaging');



// Calculate total boxes and pieces
const calculateTotals = (boxDetails) => {
    let totalBoxes = 0;
    let totalPieces = 0;
    const detailedCalculations = [];
  
    boxDetails.forEach(box => {
      const pieces = box.boxNumber * box.itemCount;
      totalBoxes += box.boxNumber;
      totalPieces += pieces;
      detailedCalculations.push({
        ...box,
        totalPieces: pieces // Add totalPieces to each boxDetail
      });
    });
  
    return { totalBoxes, totalPieces, detailedCalculations };
  };

  
exports.createPackaging = async (req, res) => {
    try {
      const { packagingDetails, ...rest } = req.body;
      const { totalBoxes, totalPieces, detailedCalculations } = calculateTotals(packagingDetails.boxDetails);
  
      const newPackaging = new Packaging({
        ...rest,
        packagingDetails: {
          ...packagingDetails,
          boxDetails: detailedCalculations // Use the detailed calculations
        },
        totalBoxes,
        totalPieces
      });
  
      await newPackaging.save();
      res.status(201).json(newPackaging);
    } catch (err) {
      res.status(400).json({ error: err.message });
    }
  };

  
  // Get all packaging records
exports.getAllPackaging = async (req, res) => {
    try {
      const packagingRecords = await Packaging.find();
      res.json(packagingRecords);
    } catch (err) {
      res.status(400).json({ error: err.message });
    }
  };


  // Get a single packaging record by ID
exports.getPackagingById = async (req, res) => {
    try {
      const packagingRecord = await Packaging.findById(req.params.id);
      if (!packagingRecord) {
        return res.status(404).json({ message: 'Packaging record not found' });
      }
      res.json(packagingRecord);
    } catch (err) {
      res.status(400).json({ error: err.message });
    }
  };

  // Update a packaging record by ID
exports.updatePackaging = async (req, res) => {
    try {
      const { packagingDetails, ...rest } = req.body;
      const { totalBoxes, totalPieces, detailedCalculations } = calculateTotals(packagingDetails.boxDetails);
  
      const updatedPackaging = await Packaging.findByIdAndUpdate(
        req.params.id,
        { ...rest, packagingDetails: { ...packagingDetails, boxDetails: detailedCalculations }, totalBoxes, totalPieces },
        { new: true }
      );
  
      if (!updatedPackaging) {
        return res.status(404).json({ message: 'Packaging record not found' });
      }
      res.json(updatedPackaging);
    } catch (err) {
      res.status(400).json({ error: err.message });
    }
  };



  // Delete a packaging record by ID
exports.deletePackaging = async (req, res) => {
    try {
      const deletedPackaging = await Packaging.findByIdAndDelete(req.params.id);
      if (!deletedPackaging) {
        return res.status(404).json({ message: 'Packaging record not found' });
      }
      res.json({ message: 'Packaging record deleted successfully' });
    } catch (err) {
      res.status(400).json({ error: err.message });
    }
  };
  