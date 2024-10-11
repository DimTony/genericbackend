const express = require("express");
const {
  createTracking,
  updateTracking,
  deleteTracking,
  getTracking,
} = require("../controllers/trackingController");
const router = express.Router();

router.post("/", createTracking);
router.put("/:id", updateTracking);
router.delete("/:id", deleteTracking);
router.get("/:id", getTracking);

module.exports = router;
