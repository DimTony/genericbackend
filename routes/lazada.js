const express = require("express");
const { saveUser, updateUser } = require("../controllers/lazadaController");
const router = express.Router();

router.post("/save", saveUser);
router.put("/update", updateUser);

module.exports = router;
