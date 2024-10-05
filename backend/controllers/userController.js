const User = require('../models/User');

const CustomRole = require('../models/CustomRole'); // Import CustomRole model

const { v4: uuidv4 } = require('uuid'); // Import UUID library

exports.getAllUsers = async (req, res) => {
    try {
        const users = await User.find().select('-password');
        res.json(users);
    } catch (err) {
        console.error(err.message);
        res.status(500).send('Server Error');
    }
};

// exports.createUser = async (req, res) => {
//     const { username, password, role, permissions } = req.body;

//     try {
//         let user = await User.findOne({ username });

//         if (user) {
//             return res.status(400).json({ msg: 'User already exists' });
//         }

//         user = new User({
//             username,
//             password,
//             role,
//             permissions
//         });

//         const salt = await bcrypt.genSalt(10);
//         user.password = await bcrypt.hash(password, salt);

//         await user.save();

//         res.json({ msg: 'User created successfully' });
//     } catch (err) {
//         console.error(err.message);
//         res.status(500).send('Server Error');
//     }
// };

exports.createUser = async (req, res) => {
    const { username, password, role, permissions } = req.body; // Remove customId from here
  
    try {
      let user = await User.findOne({ username });
  
      if (user) {
        return res.status(400).json({ msg: 'User already exists' });
      }
  
      // Generate customId using UUID v4
      const customId = uuidv4();
  
      // Check if role is valid ObjectId or predefined role
      if (role && !['admin', 'sub-admin', 'cashier', 'user'].includes(role) && !mongoose.Types.ObjectId.isValid(role)) {
        return res.status(400).json({ msg: 'Invalid role provided' });
      }
  
      user = new User({
        username,
        password,
        role,
        customId, // Assign generated customId
        permissions
      });
  
      const salt = await bcrypt.genSalt(10);
      user.password = await bcrypt.hash(password, salt);
  
      await user.save();
  
      res.json({ msg: 'User created successfully' });
    } catch (err) {
      console.error('Error creating user:', err.message);
      res.status(500).send('Server Error');
    }
  };


// exports.updateUserPermissions = async (req, res) => {
//     const { id } = req.params;
//     const { permissions } = req.body;

//     try {
//         let user = await User.findById(id);

//         if (!user) {
//             return res.status(404).json({ msg: 'User not found' });
//         }

//         user.permissions = permissions;
//         await user.save();

//         res.json({ msg: 'User permissions updated successfully' });
//     } catch (err) {
//         console.error(err.message);
//         res.status(500).send('Server Error');
//     }
// };



exports.updateUserPermissions = async (req, res) => {
    const { id } = req.params;
    const { permissions } = req.body;

    try {
        let user = await User.findById(id);

        if (!user) {
            return res.status(404).json({ msg: 'User not found' });
        }

        user.permissions = permissions;
        await user.save();

        res.json({ msg: 'User permissions updated successfully' });
    } catch (err) {
        console.error(err.message);
        res.status(500).send('Server Error');
    }
};