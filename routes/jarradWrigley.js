const express = require("express");
const router = express.Router();
const { saveClient } = require("../controllers/jarradWrigleyController");

router.post("/save", saveClient);

module.exports = router;
