const express = require("express");
const router = express.Router();
const config = require("config");
const jwt = require("jsonwebtoken");
const bcrypt = require("bcryptjs");
const auth = require("./../../middleware/auth");

// User model
const User = require("../../models/User");

// @route api/auth
// @descrption authorize an user
// @access Public
router.post("/", (req, res) => {
  const { username, password } = req.body;

  if (!username || !password)
    return res.status(400).json({ msg: "Complete all the Fields" });

  User.findOne({ username: username }, (err, user) => {
    if (err) throw err;
    if (!user) return res.status(400).json({ msg: "User doesn't Exist" });

    bcrypt.compare(password, user.password, (err, success) => {
      if (err) throw err;
      if (!success)
        return res
          .status(400)
          .json({ msg: "Username and password doesn't match" });
      jwt.sign(
        { id: user.id },
        config.get("jwtSecret"),
        { expiresIn: 24 * 60 * 60 },
        (err, token) => {
          if (err) throw err;
          res.json({
            token,
            user: { username: user.username, email: user.email },
          });
        }
      );
    });
  });
});

// @route api/auth/user
// @descrption finds user by token.
// @access Private (needs jwt)
router.get("/user", auth, (req, res) => {
  User.findById(req.user.id)
    .select("-password")
    .then((data) => res.json(data))
    .catch((err) => res.status(500).res.json(err));
});
module.exports = router;
