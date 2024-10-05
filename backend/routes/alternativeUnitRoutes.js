const express = require('express');
const router = express.Router();
const alternativeUnitController = require('../controllers/alternativeUnitController');

router.get('/', alternativeUnitController.getAllAlternativeUnits);
router.post('/', alternativeUnitController.createAlternativeUnit);
router.put('/:id', alternativeUnitController.updateAlternativeUnit);
router.delete('/:id', alternativeUnitController.deleteAlternativeUnit);

module.exports = router;
