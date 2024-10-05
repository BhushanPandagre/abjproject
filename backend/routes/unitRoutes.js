const express = require('express');
const router = express.Router();
const unitController = require('../controllers/unitController');

router.get('/', unitController.getAllUnits);
router.post('/', unitController.addUnit);
router.get('/:id', unitController.getUnitById);
router.put('/:id', unitController.updateUnit);
router.delete('/:id', unitController.deleteUnit);
router.get('/:id/items', unitController.getItemsByUnitId);


module.exports = router;
