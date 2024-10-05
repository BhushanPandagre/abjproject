const Group = require('../models/group');
const JewelryItem = require('../models/JewelryItem');

// Create a new group
exports.createGroup = async (req, res) => {
  try {
    const { name, underGroup } = req.body;
    const newGroup = new Group({ name, underGroup });
    await newGroup.save();
    res.status(201).json(newGroup);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

// Get all groups
exports.getGroups = async (req, res) => {
  try {
    const groups = await Group.find();
    res.status(200).json(groups);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

// Update a group
exports.updateGroup = async (req, res) => {
  try {
    const { id } = req.params;
    const { name, underGroup } = req.body;
    const updatedGroup = await Group.findByIdAndUpdate(id, { name, underGroup }, { new: true });
    if (!updatedGroup) return res.status(404).json({ message: 'Group not found' });
    res.status(200).json(updatedGroup);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

// Delete a group and transfer items to another group
exports.deleteGroup = async (req, res) => {
  try {
    const { id } = req.params;
    const { transferGroupId } = req.body;
    const groupToDelete = await Group.findById(id);

    if (!groupToDelete) return res.status(404).json({ message: 'Group not found' });

    if (transferGroupId) {
      const transferGroup = await Group.findById(transferGroupId);
      if (!transferGroup) return res.status(404).json({ message: 'Transfer group not found' });

      // Transfer items to the new group
      await JewelryItem.updateMany(
        { _id: { $in: groupToDelete.jewelryItems } },
        { $set: { group: transferGroupId } }
      );

      // Add transferred items to the transfer group
      transferGroup.jewelryItems.push(...groupToDelete.jewelryItems);
      await transferGroup.save();
    } else {
      // Delete all jewelry items under this group
      await JewelryItem.deleteMany({ _id: { $in: groupToDelete.jewelryItems } });
    }

    // Delete the group
    await Group.findByIdAndDelete(id);
    res.status(200).json({ message: 'Group deleted successfully' });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};
