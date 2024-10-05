// controllers/departmentController.js
const Department = require("../models/Department");

exports.getAllDepartments = async (req, res) => {
  try {
    const departments = await Department.find();
    res.status(200).json(departments);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

exports.createDepartment = async (req, res) => {
  const { name, description } = req.body;

  try {
    const newDepartment = new Department({ name, description });
    await newDepartment.save();
    res.status(201).json(newDepartment);
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
};

exports.updateDepartment = async (req, res) => {
  const { id } = req.params;
  const updates = req.body;

  try {
    const updatedDepartment = await Department.findByIdAndUpdate(id, updates, {
      new: true,
    });
    res.status(200).json(updatedDepartment);
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
};

exports.deleteDepartment = async (req, res) => {
  const { id } = req.params;

  try {
    await Department.findByIdAndDelete(id);
    res.status(200).json({ message: "Department deleted successfully" });
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
};
