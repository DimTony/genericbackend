const express = require("express");
const {
  saveUser,
  getUserById,
} = require("../controllers/genericUserController");
const router = express.Router();

router.post("/save", saveUser);
router.get("/:userId", getUserById);

module.exports = router;
