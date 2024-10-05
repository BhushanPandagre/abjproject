const Area = require('../models/area');

// Create a new area
exports.createArea = async (req, res, next) => {
  try {
    const { name } = req.body;

    // Create a new area
    const area = new Area({ name });
    await area.save();
    res.status(201).json(area);
  } catch (error) {
    next(error);
  }
};

// Get all areas
exports.getAllAreas = async (req, res, next) => {
  try {
    const areas = await Area.find();
    res.status(200).json(areas);
  } catch (error) {
    next(error);
  }
};

// Get an area by ID
exports.getAreaById = async (req, res, next) => {
  try {
    const area = await Area.findById(req.params.id);
    if (!area) return res.status(404).json({ message: 'Area not found' });
    res.status(200).json(area);
  } catch (error) {
    next(error);
  }
};

// Update an area
exports.updateArea = async (req, res, next) => {
  try {
    const { name } = req.body;
    const area = await Area.findById(req.params.id);
    if (!area) return res.status(404).json({ message: 'Area not found' });

    // Update the area
    area.name = name;
    await area.save();

    res.status(200).json(area);
  } catch (error) {
    next(error);
  }
};

// Delete an area
exports.deleteArea = async (req, res, next) => {
  try {
    const area = await Area.findByIdAndDelete(req.params.id);
    if (!area) return res.status(404).json({ message: 'Area not found' });
    res.status(200).json({ message: 'Area deleted successfully' });
  } catch (error) {
    next(error);
  }
};
