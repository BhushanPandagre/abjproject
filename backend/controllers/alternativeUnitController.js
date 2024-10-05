const AlternativeUnit = require('../models/alternativeUnitSchema');

exports.getAllAlternativeUnits = async (req, res) => {
  try {
    const units = await AlternativeUnit.find();
    res.json(units);
  } catch (error) {
    res.status(500).json({ message: 'Error fetching alternative units' });
  }
};

exports.createAlternativeUnit = async (req, res) => {
  const { name } = req.body;
  try {
    const newUnit = new AlternativeUnit({ name });
    await newUnit.save();
    res.status(201).json(newUnit);
  } catch (error) {
    res.status(500).json({ message: 'Error creating alternative unit' });
  }
};

exports.updateAlternativeUnit = async (req, res) => {
  const { id } = req.params;
  const { name } = req.body;
  try {
    const updatedUnit = await AlternativeUnit.findByIdAndUpdate(id, { name }, { new: true });
    res.json(updatedUnit);
  } catch (error) {
    res.status(500).json({ message: 'Error updating alternative unit' });
  }
};

exports.deleteAlternativeUnit = async (req, res) => {
  const { id } = req.params;
  try {
    await AlternativeUnit.findByIdAndDelete(id);
    res.json({ message: 'Alternative unit deleted' });
  } catch (error) {
    res.status(500).json({ message: 'Error deleting alternative unit' });
  }
};
