const express = require("express");
const config = require("config");
const jwt = require("jsonwebtoken");
const router = express.Router();
const bcrypt = require("bcryptjs");

// User model
const User = require("../../models/User");

// @route api/users
// @descrption register a new user
// @access Public
router.post("/", (req, res) => {
  const { name, email, password } = req.body;

  if (!email || !name || !password)
    return res.status(400).json({ msg: "Bruh, Fill all the Fields." });

  User.findOne({ email }, (err, data) => {
    if (err) throw err;
    if (data)
      return res.status(400).json({ msg: "A harami Exists with that email." });
    const newUser = new User({
      name,
      email,
      password,
    });
    bcrypt.genSalt(10, (error, salt) => {
      if (error) throw error;
      bcrypt.hash(newUser.password, salt, (err, hash) => {
        if (err) throw err;
        newUser.password = hash; // hashed password
        newUser // saving to DB
          .save()
          .then((user) => {
            // sending or signing a jwt token
            jwt.sign(
              { id: user.id },
              config.get("jwtSecret"),
              { expiresIn: 3000 },
              (err, token) => {
                if (err) throw err;
                // On success.
                res.json({
                  token,
                  user: { id: user.id, name: user.name, email: user.email },
                });
              }
            );
          })
          .catch((err) => console.log(err));
      });
    });
  });
});

module.exports = router;
