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
  const { email, password } = req.body;

  if (!email || !password)
    res.status(400).json({ msg: "Bruh, Fill all the Fields" });

  User.findOne({ email }, (err, user) => {
    if (err) throw err;
    if (!user)
      return res.status(400).json({ msg: "That harami doesn't Exist" });

    bcrypt.compare(password, user.password, (err, success) => {
      if (err) throw err;
      if (!success)
        return res.status(400).json({ msg: "Psych, That's the wrong number!" });
      jwt.sign(
        { id: user.id },
        config.get("jwtSecret"),
        { expiresIn: 24 * 60 * 60 },
        (err, token) => {
          if (err) throw err;
          res.json({
            token,
            user: { id: user.id, name: user.name, email: user.email },
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
    .catch((err) => console.log(err));
});
module.exports = router;
