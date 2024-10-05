const GST = require('../models/gst');

exports.createGST = async (req, res) => {
  try {
    const { name, rate } = req.body;
    const newGST = new GST({ name, rate });
    const savedGST = await newGST.save();
    res.status(201).json(savedGST);
  } catch (error) {
    console.error('Error saving GST:', error);
    res.status(500).send('Error saving GST');
  }
};

exports.updateGST = async (req, res) => {
  try {
    const { id } = req.params;
    const { name, rate } = req.body;
    const updatedGST = await GST.findByIdAndUpdate(id, { name, rate }, { new: true });
    if (!updatedGST) {
      return res.status(404).send('GST not found');
    }
    res.json(updatedGST);
  } catch (error) {
    console.error('Error updating GST:', error);
    res.status(500).send('Error updating GST');
  }
};

exports.deleteGST = async (req, res) => {
  try {
    const { id } = req.params;
    const deletedGST = await GST.findByIdAndDelete(id);
    if (!deletedGST) {
      return res.status(404).send('GST not found');
    }
    res.send('GST deleted successfully');
  } catch (error) {
    console.error('Error deleting GST:', error);
    res.status(500).send('Error deleting GST');
  }
};

exports.getAllGSTs = async (req, res) => {
  try {
    const gsts = await GST.find();
    res.json(gsts);
  } catch (error) {
    console.error('Error fetching GSTs:', error);
    res.status(500).send('Error fetching GSTs');
  }
};

exports.getGSTById = async (req, res) => {
  try {
    const { id } = req.params;
    const gst = await GST.findById(id);
    if (!gst) {
      return res.status(404).send('GST not found');
    }
    res.json(gst);
  } catch (error) {
    console.error('Error fetching GST:', error);
    res.status(500).send('Error fetching GST');
  }
};
