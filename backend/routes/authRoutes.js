const express = require('express');
const router = express.Router();
const authController = require('../controllers/authController');
const { authenticateToken } = require('../middleware/authMiddleware');

router.post('/register', authController.register);
router.post('/login', authController.login);
router.post('/forgot-password', authController.forgotPassword);
router.post('/reset-password', authController.resetPassword);
router.post('/create-user', authController.createUser);
router.get('/users', authController.getAllUsers);
router.put('/update-user/:userId', authController.updateUser);
router.delete('/delete-user/:userId', authController.deleteUser);


router.get('/profile', authenticateToken, authController.getProfile);


router.post('/logout', (req, res) => {
    const token = req.headers['authorization'].split(' ')[1];
    if (!token) {
        return res.sendStatus(401); // Unauthorized if no token
    }
  
    // Add token to blacklist
    blacklistedTokens.push(token);
  
    res.status(200).json({ message: 'Logged out successfully' });
  });

module.exports = router;
