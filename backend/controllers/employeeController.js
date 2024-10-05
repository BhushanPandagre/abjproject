

const Employee = require("../models/Employee");
const multer = require("multer");
const path = require("path");

const storage = multer.diskStorage({
  destination: (req, file, cb) => {
    cb(null, "uploads/");
  },
  filename: (req, file, cb) => {
    cb(null, `${Date.now()}-${file.originalname}`);
  },
});

const upload = multer({ storage });

exports.uploadImage = upload.single("image");

exports.getAllEmployees = async (req, res) => {
  try {
    const employees = await Employee.find();
    res.status(200).json(employees);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

exports.createEmployee = async (req, res) => {
  const { name, email, position, department, dateOfHire, salary } = req.body;
  const image = req.file ? req.file.path : null;

  try {
    const newEmployee = new Employee({
      name,
      email,
      position,
      department,
      dateOfHire,
      salary,
      image,
    });

    await newEmployee.save();
    res.status(201).json(newEmployee);
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
};

exports.updateEmployee = async (req, res) => {
  const { id } = req.params;
  const updates = req.body;
  if (req.file) {
    updates.image = req.file.path;
  }

  try {
    const updatedEmployee = await Employee.findByIdAndUpdate(id, updates, {
      new: true,
    });
    res.status(200).json(updatedEmployee);
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
};

exports.deleteEmployee = async (req, res) => {
  const { id } = req.params;

  try {
    await Employee.findByIdAndDelete(id);
    res.status(200).json({ message: "Employee deleted successfully" });
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
};
