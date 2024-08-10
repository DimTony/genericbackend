const express = require('express');
const { upload, handleUpload } = require('../config/upload');
const { registerApplicant } = require('../controllers/applicationController');
const router = express.Router();

router.post(
  '/register',
  upload.fields([
    { name: 'introVideo', maxCount: 1 },
    { name: 'fullBodyPhoto', maxCount: 1 },
    { name: 'headShotPhoto', maxCount: 1 },
    { name: 'receiptPhoto', maxCount: 1 },
  ]),
  handleUpload,
  registerApplicant
);

module.exports = router;
