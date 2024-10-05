const express = require('express');
const router = express.Router();
const userController = require('../controllers/userController');
const authMiddleware = require('../middleware/authMiddleware');

router.get('/', authMiddleware.authenticateUser, userController.getAllUsers);
router.post('/create', authMiddleware.authenticateUser, authMiddleware.checkAdminRole, userController.createUser);
router.put('/:id/permissions', authMiddleware.authenticateUser, authMiddleware.checkAdminRole, userController.updateUserPermissions);

module.exports = router;