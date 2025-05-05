const express = require("express");
const { jarradUpload, handleUpload } = require("../config/upload");
const {
  saveTicket,
  updateTicket,
  updateWithReceipt,
} = require("../controllers/jarradTicketController");
const router = express.Router();

router.post("/save", saveTicket);
router.put("/:id", updateTicket);
router.put(
  "/file/:id",
  jarradUpload.fields([
    { name: "pdf", maxCount: 1 }, // Field for PDF
    { name: "picture", maxCount: 1 }, // Field for picture
  ]),
  handleUpload,
  updateWithReceipt
);

module.exports = router;
