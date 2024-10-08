const express = require("express");
const router = express.Router();
const { jarradUpload, handleUpload } = require("../config/upload");
// const { uploadFiles, handleUpload } = require("../config/jarradUpload");
const {
  saveClient,
  saveConfirmation,
} = require("../controllers/jarradWrigleyController");

router.post("/save", saveClient);
router.post(
  "/confirmation/save",
  jarradUpload.fields([
    { name: "pdf", maxCount: 1 }, // Field for PDF
    { name: "picture", maxCount: 1 }, // Field for picture
  ]),
  handleUpload,
  saveConfirmation
);
// router.post("/confirmation/save", uploadFiles, handleUpload, saveConfirmation);

module.exports = router;
