const express = require('express');
const router = express.Router();
const customRoleController = require('../controllers/customRole.controller');

// POST /api/customRoles - Create a new custom role
router.post('/', customRoleController.createCustomRole);

// GET /api/customRoles - Get all custom roles
router.get('/', customRoleController.getAllCustomRoles);

// PUT update a custom role by ID
router.put('/:id', customRoleController.updateCustomRole);

// DELETE delete a custom role by ID
router.delete('/:id', customRoleController.deleteCustomRole);

module.exports = router;
