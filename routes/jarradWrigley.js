const express = require("express");
const router = express.Router();
const { upload, handleUpload } = require("../config/upload");
const {
  saveClient,
  saveConfirmation,
} = require("../controllers/jarradWrigleyController");

router.post("/save", saveClient);
router.post(
  "/confirmation/save",
  upload.fields([
    { name: "pdf", maxCount: 1 },
    { name: "picture", maxCount: 1 },
  ]),
  handleUpload,
  saveConfirmation
);

module.exports = router;
