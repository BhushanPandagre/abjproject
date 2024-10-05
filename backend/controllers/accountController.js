


const Account = require('../models/Account');

// Function to generate a 5-digit ID
function generate5DigitId() {
  const id = Math.floor(10000 + Math.random() * 90000).toString(); // Generates a random 5-digit number
  return id;
}

// Create a new account with image upload
exports.createAccount = async (req, res) => {
  try {
    const customId = generate5DigitId(); // Generate custom ID
    const newAccountData = { ...req.body, customId }; // Include customId in account data
    if (req.file) {
      newAccountData.image = req.file.path; // Assign the path of the uploaded image to the account
    }
    const newAccount = new Account(newAccountData);
    const savedAccount = await newAccount.save();
    res.status(201).json(savedAccount);
  } catch (err) {
    res.status(400).json({ message: err.message });
  }
};

// Retrieve all accounts
exports.getAllAccounts = async (req, res) => {
  try {
    const accounts = await Account.find();
    res.json(accounts);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};

// Retrieve an account by ID
exports.getAccountById = async (req, res) => {
  try {
    const account = await Account.findById(req.params.id);
    if (!account) {
      return res.status(404).json({ message: 'Account not found' });
    }
    res.json(account);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};

// Update an account by ID with image upload
exports.updateAccount = async (req, res) => {
  try {
    const updatedAccount = await Account.findByIdAndUpdate(req.params.id, req.body, { new: true });
    if (!updatedAccount) {
      return res.status(404).json({ message: 'Account not found' });
    }

    // Handle specific updates for address fields if provided
    if (req.body.address) {
      const { streetName, houseNumber, landmark, crossRoad, locality, relatedLocation, otherInstructions } = req.body.address;
      if (streetName) updatedAccount.address.streetName = streetName;
      if (houseNumber) updatedAccount.address.houseNumber = houseNumber;
      if (landmark) updatedAccount.address.landmark = landmark;
      if (crossRoad) updatedAccount.address.crossRoad = crossRoad;
      if (locality) updatedAccount.address.locality = locality;
      if (relatedLocation) updatedAccount.address.relatedLocation = relatedLocation;
      if (otherInstructions) updatedAccount.address.otherInstructions = otherInstructions;
    }

    // Handle image update if a new image is uploaded
    if (req.file) {
      updatedAccount.image = req.file.path; // Update the image path
    }

    await updatedAccount.save();
    res.json(updatedAccount);
  } catch (err) {
    res.status(400).json({ message: err.message });
  }
};

// Delete an account by ID
exports.deleteAccount = async (req, res) => {
  try {
    const deletedAccount = await Account.findByIdAndDelete(req.params.id);
    if (!deletedAccount) {
      return res.status(404).json({ message: 'Account not found' });
    }
    res.json({ message: 'Account deleted' });
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};


