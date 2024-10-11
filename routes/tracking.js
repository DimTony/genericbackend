const express = require("express");
const {
  createTracking,
  updateTracking,
  deleteTracking,
  getTracking,
  getTrackingByReference,
  getTrackingByTCN,
} = require("../controllers/trackingController");
const router = express.Router();

router.post("/", createTracking);
router.put("/:id", updateTracking);
router.delete("/:id", deleteTracking);
router.get("/:id", getTracking);
router.get("/reference/:id/:country", getTrackingByReference);
router.get("/tcn/:id/:date", getTrackingByTCN);

module.exports = router;
