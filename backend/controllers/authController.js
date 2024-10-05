
//-=---------------------------------------real one -------------------------------//
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const User = require('../models/User');
const crypto = require('crypto');
const nodemailer = require('nodemailer');

//----------------------for register------------------------------//


exports.register = async (req, res) => {
  try {
      const { username, email, password, role, permissions } = req.body;
      const existingUser = await User.findOne({ email });

      if (existingUser) {
          return res.status(400).json({ message: 'User already exists' });
      }

      const hashedPassword = await bcrypt.hash(password, 10);
      const newUser = new User({ username, email, password: hashedPassword, role, permissions });

      await newUser.save();
      res.status(201).json({ message: 'User registered successfully' });
  } catch (error) {
      console.error('Error during registration:', error);
      res.status(500).json({ message: 'Internal server error' });
  }
};

//-------------------------------- for login---------------------------//


exports.login = async (req, res) => {
  try {
    const { email, password, userType } = req.body;
    const user = await User.findOne({ email });

    if (!user) {
      return res.status(401).json({ message: 'Invalid credentials' });
    }

    // Check if the input email exactly matches the stored email
    if (email !== user.email) {
      return res.status(401).json({ message: 'Invalid credentials' });
    }

    const isPasswordValid = await bcrypt.compare(password, user.password);
    if (!isPasswordValid) {
      return res.status(401).json({ message: 'Invalid credentials' });
    }

    // Check if the selected userType matches the user's role
    if (user.role !== userType) {
      return res.status(403).json({ message: 'Unauthorized access' });
    }

    const token = jwt.sign({ userId: user._id, role: user.role }, 'YourJWTSecret', { expiresIn: '24h' });
    res.json({ token, role: user.role });
  } catch (error) {
    console.error('Error during login:', error);
    res.status(500).json({ message: 'Internal server error' });
  }
};



const transporter = nodemailer.createTransport({
  service: 'gmail',
  auth: {
      user: 'pandagrebhushan3@gmail.com',  // Your email address
      pass: 'uavg zxvr jeik okqj'  // Your password for email account
  }
});



// exports.forgotPassword = async (req, res) => {
//   const { email } = req.body;
//   try {
//       const user = await User.findOne({ email });
//       if (!user) {
//           return res.status(404).json({ message: 'User not found' });
//       }
//       const resetToken = await user.generateResetToken();

//       // Send email
//       const mailOptions = {
//           from: 'pandagrebhushan3@gmail.com',
//           to: user.email,
//           subject: 'Password Reset Request',
//           html: `
//               <p>You requested a password reset for your account.</p>
//               <p>Click <a href="http://localhost:5173/reset_password?token=${resetToken}&email=${user.email}">here</a> to reset your password.</p>
//           `
//       };

//       transporter.sendMail(mailOptions, (error, info) => {
//           if (error) {
//               console.error('Error sending email:', error);
//               return res.status(500).json({ message: 'Error sending email' });
//           }
//           console.log('Email sent:', info.response);
//           res.status(200).json({ message: 'Password reset token generated and email sent successfully' });
//       });
//   } catch (error) {
//       console.error('Error generating reset token:', error);
//       res.status(500).json({ message: 'Internal server error' });
//   }
// };


const OTP_EXPIRATION_TIME = 15 * 60 * 1000; // 15 minutes

exports.forgotPassword = async (req, res) => {
  const { email } = req.body;
  try {
    const user = await User.findOne({ email });
    if (!user) {
      return res.status(404).json({ message: "User not found" });
    }
    
    // Generate OTP
    const otp = crypto.randomInt(100000, 999999).toString(); // Generates a 6-digit OTP
    const otpExpiration = Date.now() + OTP_EXPIRATION_TIME;

    // Store OTP and expiration time
    user.otp = otp;
    user.otpExpiration = otpExpiration;
    await user.save();

  


    const mailOptions = {
      from: "pandagrebhushan3@gmail.com",
      to: user.email,
      subject: "Password Reset Request",
      html: `
        <!DOCTYPE html>
        <html lang="en">
        <head>
          <meta charset="UTF-8">
          <meta name="viewport" content="width=device-width, initial-scale=1.0">
          <title>Password Reset Request</title>
          <style>
            body {
              font-family: Arial, sans-serif;
              background-color: #f4f4f4;
              margin: 0;
              padding: 20px;
            }
            .container {
              max-width: 600px;
              margin: 0 auto;
              background-color: #ffffff;
              padding: 20px;
              border-radius: 8px;
              box-shadow: 0 0 10px rgba(0, 0, 0, 0.1);
            }
            .header {
              background-color: #007bff;
              color: #ffffff;
              padding: 20px;
              text-align: center;
              border-radius: 8px 8px 0 0;
            }
            .header h1 {
              margin: 0;
              font-size: 24px;
            }
            .content {
              padding: 20px;
            }
            .content p {
              margin: 0 0 10px;
            }
            .otp {
              font-size: 24px;
              font-weight: bold;
              color: #007bff;
              margin: 10px 0;
            }
            .button {
              display: inline-block;
              background-color: #007bff;
              color: #ffffff;
              padding: 10px 20px;
              text-decoration: none;
              border-radius: 5px;
              font-size: 16px;
              font-weight: bold;
              text-align: center;
            }
            .footer {
              text-align: center;
              padding: 10px;
              font-size: 12px;
              color: #888888;
            }
             
          </style>
        </head>
        <body>
          <div class="container">
            <div class="header">
              <h1>Password Reset Request</h1>
            </div>
            <div class="content">
              <p>Hi ${user.username || 'User'},</p>
              <p>You requested a password reset for your account.</p>
              <p>Your OTP is:</p>
              <div class="otp">${otp}</div>
              <p>This OTP will expire in 15 minutes.</p>
              <p>Click the button below to reset your password:</p>
              <a href="http://localhost:5173/reset_password" class="button"  >Reset Password</a>
            </div>
            <div class="footer">
              <p>If you did not request this change, please ignore this email.</p>
              <p>© ${new Date().getFullYear()} Code Lab Pvt. Ltd Bhopal </p>
            </div>
          </div>
        </body>
        </html>
      `,
    };
    

    transporter.sendMail(mailOptions, (error, info) => {
      if (error) {
        console.error("Error sending email:", error);
        return res.status(500).json({ message: "Error sending email" });
      }
      console.log("Email sent:", info.response);
      res
        .status(200)
        .json({ message: "OTP sent successfully" });
    });
  } catch (error) {
    console.error("Error generating OTP:", error);
    res.status(500).json({ message: "Internal server error" });
  }
};



// exports.resetPassword = async (req, res) => {
//     const { email, token, newPassword } = req.body;
//     try {
//         const user = await User.findOne({ email });
//         if (!user) {
//             return res.status(404).json({ message: 'User not found' });
//         }
//         if (token !== user.resetToken || Date.now() > user.resetTokenExpiration) {
//             return res.status(400).json({ message: 'Invalid or expired token' });
//         }
//         const hashedPassword = await bcrypt.hash(newPassword, 10);
//         user.password = hashedPassword;
//         user.resetToken = undefined;
//         user.resetTokenExpiration = undefined;
//         await user.save();
//         res.status(200).json({ message: 'Password reset successfully' });
//     } catch (error) {
//         console.error('Error resetting password:', error);
//         res.status(500).json({ message: 'Internal server error' });
//     }
// };



exports.resetPassword = async (req, res) => {
  const { email, otp, newPassword } = req.body;
  try {
    const user = await User.findOne({ email });
    if (!user) {
      return res.status(404).json({ message: "User not found" });
    }
    
    // Check OTP and expiration
    if (otp !== user.otp || Date.now() > user.otpExpiration) {
      return res.status(400).json({ message: "Invalid or expired OTP" });
    }

    // Hash the new password
    const hashedPassword = await bcrypt.hash(newPassword, 10);
    user.password = hashedPassword;

    // Clear OTP and expiration time
    user.otp = undefined;
    user.otpExpiration = undefined;
    await user.save();

    res.status(200).json({ message: "Password reset successfully" });
  } catch (error) {
    console.error("Error resetting password:", error);
    res.status(500).json({ message: "Internal server error" });
  }
};



let blacklistedTokens = [];

// Endpoint to logout
exports.logout = (req, res) => {
    const token = req.headers.authorization.split(' ')[1]; // Assuming token in Authorization header

    // Add token to blacklist
    blacklistedTokens.push(token);

    res.status(200).json({ message: 'Logged out successfully' });
};

// Middleware to check token on incoming requests
exports.checkToken = (req, res, next) => {
    const token = req.headers.authorization.split(' ')[1]; // Assuming token in Authorization header

    // Check if token is blacklisted
    if (blacklistedTokens.includes(token)) {
        return res.status(401).json({ message: 'Token is blacklisted' });
    }

    // Token is valid, proceed with the request
    next();
};


//-------------------------------- create user---------------------------//


exports.createUser = async (req, res) => {
  try {
      const { username, email, password, role, permissions } = req.body;
      const hashedPassword = await bcrypt.hash(password, 10);
      const newUser = new User({ username, email, password: hashedPassword, role, permissions });
      await newUser.save();
      res.status(201).json({ message: 'User created successfully' });
  } catch (error) {
      console.error('Error creating user:', error);
      res.status(500).json({ message: 'Internal server error' });
  }
};


// Controller function to fetch all users
exports.getAllUsers = async (req, res) => {
  try {
      const users = await User.find({}, '-password'); // Exclude password field from response
      res.status(200).json(users);
  } catch (error) {
      console.error('Error fetching users:', error);
      res.status(500).json({ message: 'Internal server error' });
  }
};


//--------------------------------for update user---------------------------//
exports.updateUser = async (req, res) => {
  const { username, email, role, permissions } = req.body;
  const { userId } = req.params;
  try {
      const updatedUser = await User.findByIdAndUpdate(userId, { username, email, role, permissions }, { new: true });
      if (!updatedUser) {
          return res.status(404).json({ message: 'User not found' });
      }
      res.status(200).json({ message: 'User updated successfully', user: updatedUser });
  } catch (error) {
      console.error('Error updating user:', error);
      res.status(500).json({ message: 'Internal server error' });
  }
};


//--------------------------------for delete user---------------------------//

// Controller function to delete a user
exports.deleteUser = async (req, res) => {
  const { userId } = req.params;
  try {
      const deletedUser = await User.findByIdAndDelete(userId);
      if (!deletedUser) {
          return res.status(404).json({ message: 'User not found' });
      }
      res.status(200).json({ message: 'User deleted successfully' });
  } catch (error) {
      console.error('Error deleting user:', error);
      res.status(500).json({ message: 'Internal server error' });
  }
};


exports.getProfile = async (req, res) => {
    try {
      const user = await User.findById(req.user.userId).select('-password');
      if (!user) {
        return res.status(404).json({ message: 'User not found' });
      }
      res.status(200).json(user);
    } catch (error) {
      console.error('Error fetching user profile:', error);
      res.status(500).json({ message: 'Internal server error' });
    }
  };


