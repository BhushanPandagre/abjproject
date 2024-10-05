const CustomRole = require('../models/customRole.model');

// Create a new custom role
exports.createCustomRole = async (req, res) => {
  try {
    const { name, permissions } = req.body;
    const customRole = new CustomRole({ name, permissions });
    await customRole.save();
    res.status(201).json(customRole);
  } catch (err) {
    res.status(400).json({ message: err.message });
  }
};

// Get all custom roles
exports.getAllCustomRoles = async (req, res) => {
  try {
    const customRoles = await CustomRole.find();
    res.json(customRoles);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};



// Update a custom role by ID
exports.updateCustomRole = async (req, res) => {
  const { id } = req.params;
  const { name, permissions } = req.body;

  try {
    const updatedCustomRole = await CustomRole.findByIdAndUpdate(
      id,
      { name, permissions },
      { new: true } // Return the updated document
    );

    if (!updatedCustomRole) {
      return res.status(404).json({ message: 'Custom role not found' });
    }

    res.json(updatedCustomRole);
  } catch (err) {
    res.status(400).json({ message: err.message });
  }
};




// Delete a custom role by ID
exports.deleteCustomRole = async (req, res) => {
  const { id } = req.params;

  try {
    const deletedCustomRole = await CustomRole.findByIdAndDelete(id);

    if (!deletedCustomRole) {
      return res.status(404).json({ message: 'Custom role not found' });
    }

    res.json({ message: 'Custom role deleted successfully' });
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};

