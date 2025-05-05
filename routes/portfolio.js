const express = require("express");
const router = express.Router();
const {
  getPortfolio,
  createPortfolio,
  updatePortfolio,
  deletePortfolio,
} = require("../controllers/portfolioController");
const auth = require("../middleware/auth");

router.delete("/:id", deletePortfolio);
router.put("/", updatePortfolio);
router.post("/", createPortfolio);
router.get("/", getPortfolio);

module.exports = router;
