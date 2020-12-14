const express = require("express");
const router = express.Router();

// User model
const User = require("../../models/User");

// @route api/users
// @descrption register a new user
// @access Public
router.post("/", (req, res) => {
  res.send("register");
});

module.exports = router;
