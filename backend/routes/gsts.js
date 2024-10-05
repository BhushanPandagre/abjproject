const express = require('express');
const router = express.Router();
const {
  createGST,
  updateGST,
  deleteGST,
  getAllGSTs,
  getGSTById
} = require('../controllers/gstController');

router.post('/', createGST);
router.put('/:id', updateGST);
router.delete('/:id', deleteGST);
router.get('/', getAllGSTs);
router.get('/:id', getGSTById);

module.exports = router;
