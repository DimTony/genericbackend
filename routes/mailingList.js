const express = require('express');
const auth = require('../middleware/auth');
const {
  signup,
  convertToISO,
} = require('../controllers/mailingListController');
const router = express.Router();

router.post('/signup', signup);
router.post('/convert', convertToISO);

module.exports = router;
