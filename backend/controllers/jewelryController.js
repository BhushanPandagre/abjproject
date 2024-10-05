// const fs = require("fs");
const path = require("path");
const Group = require("../models/group");
const Unit = require("../models/units");
const JewelryItem = require("../models/JewelryItem");

exports.createJewelryItem = async (req, res) => {
  try {
    const {
      name,
      printname,
      itemType,
      mainUnitBarcode,
      alternativeUnitBarcode,
      group,
      category,
      description,
      unit,
      alternativeunit,
      packagingUnit,
      selectedConversion,
      conversionFactor,
      quantity,
      retailerPrice,
      semiWholesellerPrice,
      wholesellerPrice,
      alternativeSemiWholesellerPrice,
      alternativeWholesellerPrice,
      alternativeRetailerPrice,
      purchaseprice,
      minSalePrice,
      altOpeningStock,
      openingStock,
      MRP,
      gst,
      HSNCode,
      salediscount,
    } = req.body;

    // Handle file uploads
    const images = req.files
      ? req.files.map((file) => `/uploads/${file.filename}`)
      : [];

    // Find the unit by name
    const unitDoc = await Unit.findOne({ name: unit });
    if (!unitDoc) {
      return res.status(404).send("Unit not found");
    }

    // Check for duplicate
    const duplicateItem = await JewelryItem.findOne({
      name,
      group,
      retailerPrice,
      semiWholesellerPrice,
      wholesellerPrice,
    });

    if (duplicateItem) {
      return res.status(409).json({
        message:
          "A jewelry item with the same name, group, and prices already exists.",
        duplicateItem,
      });
    }

    const newItem = new JewelryItem({
      name,
      printname,
      itemType,
      mainUnitBarcode,
      alternativeUnitBarcode,
      group,
      category,
      description,
      unit: unitDoc._id,
      alternativeunit,
      packagingUnit,
      selectedConversion,
      conversionFactor,
      quantity,
      retailerPrice,
      semiWholesellerPrice,
      wholesellerPrice,
      alternativeSemiWholesellerPrice,
      alternativeWholesellerPrice,
      alternativeRetailerPrice,
      purchaseprice,
      minSalePrice,
      altOpeningStock,
      openingStock,
      MRP,
      gst,
      HSNCode,
      salediscount,
      images,
    });

    const savedItem = await newItem.save();
    await Group.findByIdAndUpdate(group, {
      $push: { jewelryItems: savedItem._id },
    });

    res.status(201).json(savedItem);
  } catch (error) {
    console.error("Error saving jewelry item:", error);
    res.status(500).send("Error saving jewelry item");
  }
};

exports.getAllJewelryItems = async (req, res) => {
  try {
    const items = await JewelryItem.find().populate("group");
    res.json(items);
  } catch (error) {
    console.error("Error fetching jewelry items:", error);
    res.status(500).send("Error fetching jewelry items");
  }
};

exports.getJewelryItemById = async (req, res) => {
  try {
    const { id } = req.params;
    const jewelryItem = await JewelryItem.findById(id)
      .populate("group")
      .populate("gst")
      .populate("unit");
    if (!jewelryItem) {
      return res.status(404).send("Jewelry item not found");
    }
    res.json(jewelryItem);
  } catch (error) {
    console.error("Error fetching jewelry item:", error);
    res.status(500).send("Error fetching jewelry item");
  }
};

exports.searchJewelryItems = async (req, res) => {
  try {
    const { searchTerm } = req.query;
    const regex = new RegExp(searchTerm, "i"); // Case-insensitive search

    const items = await JewelryItem.find({
      $or: [
        { name: { $regex: regex } },
        { category: { $regex: regex } },
        { description: { $regex: regex } },
      ],
    }).populate("group");

    res.json(items);
  } catch (error) {
    console.error("Error searching jewelry items:", error);
    res.status(500).send("Error searching jewelry items");
  }
};

exports.updateJewelryItem = async (req, res) => {
  try {
    const { id } = req.params;

    // Fetch the current item from the database
    const currentItem = await JewelryItem.findById(id);
    if (!currentItem) {
      return res.status(404).json({ message: "Jewelry item not found" });
    }

    // Update the item with new fields from req.body
    const updateFields = { ...req.body };

    // Handle file uploads if any
    if (req.files) {
      updateFields.images = [
        ...currentItem.images,
        ...req.files.map((file) => `/uploads/${file.filename}`),
      ];
    } else {
      updateFields.images = currentItem.images;
    }

    // Update the item in the database
    const updatedItem = await JewelryItem.findByIdAndUpdate(id, updateFields, {
      new: true,
    });

    res.json(updatedItem);
  } catch (error) {
    console.error("Error updating jewelry item:", error);
    res.status(500).json({ message: "Internal server error" });
  }
};
exports.deleteImage = async (req, res) => {
  try {
    const { id } = req.params;
    const { image } = req.body;

    // Check if the image exists in the database
    const jewelryItem = await JewelryItem.findById(id);
    if (!jewelryItem) {
      return res.status(404).json({ message: "Jewelry item not found" });
    }

    // Check if the image is part of the item's images
    if (!jewelryItem.images.includes(image)) {
      return res.status(404).json({ message: "Image not found in item" });
    }

    // Remove the image from the database
    await JewelryItem.findByIdAndUpdate(id, {
      $pull: { images: image },
    });

    // Remove the image file from the server (if necessary)
    const imagePath = path.join(__dirname, "..", "uploads", image);
    fs.unlink(imagePath, (err) => {
      if (err) {
        console.error("Error removing image file:", err);
      }
    });

    res.json({ message: "Image deleted successfully" });
  } catch (error) {
    console.error("Error deleting image:", error);
    res.status(500).json({ message: "Internal server error" });
  }
};

exports.deleteJewelryItem = async (req, res) => {
  try {
    const deletedItem = await JewelryItem.findByIdAndDelete(req.params.id);
    if (!deletedItem) {
      return res.status(404).send("Jewelry item not found");
    }

    await Group.findByIdAndUpdate(deletedItem.group, {
      $pull: { jewelryItems: deletedItem._id },
    });

    res.send("Jewelry item deleted successfully");
  } catch (error) {
    console.error("Error deleting jewelry item:", error);
    res.status(500).send("Error deleting jewelry item");
  }
};

exports.translateText = async (text, targetLang) => {
  try {
    const response = await axios.post(
      "https://cors-anywhere.herokuapp.com/https://libretranslate.de/translate",
      {
        q: text,
        target: targetLang,
      }
    );
    return response.data;
  } catch (error) {
    console.error("Error translating text:", error);
    throw error;
  }
};
