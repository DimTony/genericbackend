const express = require('express');
const {
  getResearches,
  createResearch,
  searchResearch,
} = require('../controllers/researchController');
const router = express.Router();

router.get('/', getResearches);
router.post('/', createResearch);
router.post('/search', searchResearch);

module.exports = router;
