const DataModel = require("../models/dataModel");

// Create a new document
exports.createData = async (req, res) => {
  try {
    const newData = new DataModel(req.body);
    const savedData = await newData.save();
    res.status(201).json(savedData);
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
};

// Fetch all documents
exports.getAllData = async (req, res) => {
  try {
    const allData = await DataModel.find();
    res.status(200).json(allData);
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
};

// Fetch a single document by ID
exports.getDataById = async (req, res) => {
  try {
    const data = await DataModel.findById(req.params.id);
    if (!data) {
      return res.status(404).json({ message: "Data not found" });
    }
    res.status(200).json(data);
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
};

// Update a document by ID
exports.updateData = async (req, res) => {
  try {
    const updatedData = await DataModel.findByIdAndUpdate(
      req.params.id,
      req.body,
      { new: true }
    );
    if (!updatedData) {
      return res.status(404).json({ message: "Data not found" });
    }
    res.status(200).json(updatedData);
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
};

// Delete a document by ID
exports.deleteData = async (req, res) => {
  try {
    const deletedData = await DataModel.findByIdAndDelete(req.params.id);
    if (!deletedData) {
      return res.status(404).json({ message: "Data not found" });
    }
    res.status(200).json({ message: "Data deleted successfully" });
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
};
