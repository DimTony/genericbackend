const express = require('express');
const { verifyIp, blockIp } = require('../controllers/ipController');
const router = express.Router();

router.post('/verify-ip', verifyIp);
router.post('/block-ip', blockIp);

module.exports = router;
