const moment = require("moment");

const logger = (req, res, next) => {
  console.log(`${req.method} : ${req.url} | ${moment().format("LTS")}`);
  next();
};

module.exports = logger;
