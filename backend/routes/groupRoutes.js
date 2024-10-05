const express = require('express');
const router = express.Router();
const groupController = require('../controllers/groupController');

router.post('/group', groupController.createGroup);
router.get('/groups', groupController.getGroups);
router.put('/groups/:id', groupController.updateGroup);
router.delete('/groups/:id', groupController.deleteGroup);

module.exports = router;
