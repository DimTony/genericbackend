const express = require("express");
const router = express.Router();
const {
  saveClient,
  saveConfirmation,
} = require("../controllers/jarradWrigleyController");

router.post("/save", saveClient);
router.post("/confirmation/save", saveConfirmation);

module.exports = router;
