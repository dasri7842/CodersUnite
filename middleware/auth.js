const jwt = require("jsonwebtoken");
const config = require("config");

const auth = (req, res, next) => {
  const token = req.header("x-auth-token");
  if (!token) return res.status(401).json({ msg: "Unauthorized, No token" });
  try {
    req.user = jwt.verify(token, config.get("jwtSecret"));
    next();
  } catch (e) {
    return res.status(400).json({ msg: "Not a valid token" });
  }
};

module.exports = auth;
