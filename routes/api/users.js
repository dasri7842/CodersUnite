const express = require("express");
const config = require("config");
const jwt = require("jsonwebtoken");
const router = express.Router();
const bcrypt = require("bcryptjs");

// auth middleware
const auth = require("../../middleware/auth");

// User model
const User = require("../../models/User");

// @route api/users
// @descrption register a new user
// @access Public
router.post("/", (req, res) => {
  const { username, email, password } = req.body;

  if (!email || !username || !password)
    return res.status(400).json({ msg: "Complete all the Fields." });

  User.findOne({ email }, (err, data) => {
    if (err) throw err;
    if (data)
      return res
        .status(400)
        .json({ msg: "Email is already taken, use different" });
    const newUser = new User({
      username,
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
            // signing and sending a jwt token
            jwt.sign(
              { id: user.id },
              config.get("jwtSecret"),
              { expiresIn: 3000 },
              (err, token) => {
                if (err) throw err;
                // On success.
                res.json({
                  token,
                  user: { username: user.username, email: user.email },
                });
              }
            );
          })
          .catch((err) => console.log(err));
      });
    });
  });
});

// @route api/users/user
// @descrption gets user profile
// @access Public
router.get("/:id", (req, res) => {
  User.findOne({ username: req.params.id })
    .select("-password")
    .then((data) => res.json(data))
    .catch((err) => res.status(404).json({ success: false }));
});

// @route api/users/validateuser
// @descrption finds if user exists with username
// @access Public
router.get("/validateuser", (req, res) => {
  User.findOne({ username: req.header("username") })
    .select("-password")
    .then((data) => {
      if (data) res.json(true);
      else res.json(false);
    })
    .catch((err) => res.status(500).res.json(err));
});

// @route api/users/validateemail
// @descrption finds if user exists with email
// @access Public
router.get("/validateemail", (req, res) => {
  User.findOne({ email: req.header("email") })
    .select("-password")
    .then((data) => {
      if (data) res.json(true);
      else res.json(false);
    })
    .catch((err) => res.status(500).res.json(err));
});

// @route api/users/user
// @descrption updates user profile
// @access private (needs token).
router.post("/user", auth, (req, res) => {
  const { username, profile } = req.body;
  User.findOneAndUpdate(
    { username: username }, // filter
    { $set: { profile: profile } }, // update if found or upsert property
    { new: true, select: "-password" }, // Returne doc as Updated
    (err, doc) => {
      if (err) res.status(500).json({ msg: "Something Went Wrong :(" });
      res.json(doc);
    }
  );
});

module.exports = router;
