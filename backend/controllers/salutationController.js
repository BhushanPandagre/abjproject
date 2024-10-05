


const Salutation = require('../models/Salutation');

// Create a new salutation
exports.createSalutation = async (req, res) => {
  const { salutation } = req.body;

  try {
    const newSalutation = new Salutation({ salutation });
    await newSalutation.save();
    res.status(201).json({ message: 'Salutation created successfully', newSalutation });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// Get all salutations
exports.getAllSalutations = async (req, res) => {
  try {
    const salutations = await Salutation.find();
    res.status(200).json(salutations);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// Get a salutation by ID
exports.getSalutation = async (req, res) => {
  const { salutationId } = req.params;

  try {
    const salutation = await Salutation.findById(salutationId);
    if (!salutation) {
      return res.status(404).json({ message: 'Salutation not found' });
    }
    res.status(200).json(salutation);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// Update an existing salutation
exports.updateSalutation = async (req, res) => {
  const { salutationId } = req.params;
  const { salutation } = req.body;

  try {
    const updatedSalutation = await Salutation.findByIdAndUpdate(
      salutationId,
      { salutation },
      { new: true, runValidators: true }
    );

    if (!updatedSalutation) {
      return res.status(404).json({ message: 'Salutation not found' });
    }

    res.status(200).json({ message: 'Salutation updated successfully', updatedSalutation });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// Delete a salutation
exports.deleteSalutation = async (req, res) => {
  const { salutationId } = req.params;

  try {
    const salutation = await Salutation.findByIdAndDelete(salutationId);
    if (!salutation) {
      return res.status(404).json({ message: 'Salutation not found' });
    }

    res.status(200).json({ message: 'Salutation deleted successfully' });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};
