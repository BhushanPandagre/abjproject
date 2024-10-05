// const Unit = require('../models/units');
// const JewelryItem = require('../models/JewelryItem');

// const unitController = {
//   getAllUnits: async (req, res) => {
//     try {
//       const units = await Unit.find();
//       res.json(units);
//     } catch (error) {
//       res.status(500).json({ message: error.message });
//     }
//   },

//   addUnit: async (req, res) => {
//     const { name } = req.body;

//     try {
//       const newUnit = new Unit({ name });
//       const savedUnit = await newUnit.save();
//       res.status(201).json(savedUnit);
//     } catch (error) {
//       res.status(400).json({ message: error.message });
//     }
//   },

//   getUnitById: async (req, res) => {
//     const { id } = req.params;

//     try {
//       const unit = await Unit.findById(id);
//       if (!unit) {
//         return res.status(404).json({ message: 'Unit not found' });
//       }
//       res.json(unit);
//     } catch (error) {
//       res.status(500).json({ message: error.message });
//     }
//   },

//   updateUnit: async (req, res) => {
//     const { id } = req.params;
//     const { name } = req.body;

//     try {
//       const updatedUnit = await Unit.findByIdAndUpdate(id, { name }, { new: true });
//       if (!updatedUnit) {
//         return res.status(404).json({ message: 'Unit not found' });
//       }
//       res.json(updatedUnit);
//     } catch (error) {
//       res.status(400).json({ message: error.message });
//     }
//   },
// // Delete Unit route
// deleteUnit: async (req, res) => {
//   try {
//     const unitId = req.params.id;

//     // Check if any JewelryItem references this unit
//     const itemsUsingUnit = await JewelryItem.find({ 
//       $or: [{ unit: unitId }, { alternativeunit: unitId }, { packagingunit: unitId }]
//     }).select('name _id');

//     if (itemsUsingUnit.length > 0) {
//       // Return the items using this unit
//       return res.status(400).json({ items: itemsUsingUnit });
//     }

//     // If no references, delete the unit
//     await Unit.findByIdAndDelete(unitId);
//     res.status(200).send({ message: 'Unit deleted successfully' });
//   } catch (error) {
//     res.status(500).json({ error: 'Server error' });
//   }
// },
// };

// module.exports = unitController;





const Unit = require('../models/units');
const JewelryItem = require('../models/JewelryItem');

const unitController = {
  getAllUnits: async (req, res) => {
    try {
      const units = await Unit.find();
      res.json(units);
    } catch (error) {
      res.status(500).json({ message: error.message });
    }
  },

  addUnit: async (req, res) => {
    const { name } = req.body;

    try {
      const newUnit = new Unit({ name });
      const savedUnit = await newUnit.save();
      res.status(201).json(savedUnit);
    } catch (error) {
      res.status(400).json({ message: error.message });
    }
  },

  getUnitById: async (req, res) => {
    const { id } = req.params;

    try {
      const unit = await Unit.findById(id);
      if (!unit) {
        return res.status(404).json({ message: 'Unit not found' });
      }
      res.json(unit);
    } catch (error) {
      res.status(500).json({ message: error.message });
    }
  },

  updateUnit: async (req, res) => {
    const { id } = req.params;
    const { name } = req.body;

    try {
      const updatedUnit = await Unit.findByIdAndUpdate(id, { name }, { new: true });
      if (!updatedUnit) {
        return res.status(404).json({ message: 'Unit not found' });
      }
      res.json(updatedUnit);
    } catch (error) {
      res.status(400).json({ message: error.message });
    }
  },

  deleteUnit: async (req, res) => {
    try {
      const unitId = req.params.id;

      // Check if any JewelryItem references this unit
      const itemsUsingUnit = await JewelryItem.find({ 
        $or: [{ unit: unitId }, { alternativeunit: unitId }, { packagingunit: unitId }]
      }).select('name _id');

      if (itemsUsingUnit.length > 0) {
        // Return the items using this unit
        return res.status(400).json({ items: itemsUsingUnit });
      }

      // If no references, delete the unit
      await Unit.findByIdAndDelete(unitId);
      res.status(200).send({ message: 'Unit deleted successfully' });
    } catch (error) {
      res.status(500).json({ error: 'Server error' });
    }
  },

  // New endpoint to get items by unit ID
  getItemsByUnitId: async (req, res) => {
    const { id } = req.params;
    try {
      const items = await JewelryItem.find({ 
        $or: [{ unit: id }, { alternativeunit: id }, { packagingunit: id }]
      });
      res.json(items);
    } catch (error) {
      res.status(500).json({ message: error.message });
    }
  },
};

module.exports = unitController;

