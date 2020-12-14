const express = require("express");
const mongoose = require("mongoose");
const moment = require("moment");
const path = require("path");
const app = express();

// Body parser Middleware
app.use(express.json());

// logger Middleware. --DEV mode.
// app.use((req, res, next) => {
//   console.log(`${req.method} : ${req.url} | ${moment().format()}`);
//   next();
// });

// use routes.
app.use("/api/posts", require("./routes/api/posts"));
app.use("/api/users", require("./routes/api/users"));

// DB config
const db = require("./config/keys").mongoURI;

// Connecting to mongoDB
mongoose
  .connect(db, {
    useNewUrlParser: true,
    useCreateIndex: true,
    useUnifiedTopology: true,
    useFindAndModify: false,
  })
  .then(() => console.log("Connected to MongoDB"))
  .catch((err) => console.error(err));

if (process.env.NODE_ENV === "production") {
  app.use(express.static("client/build"));

  app.get("*", (req, res) => {
    res.sendFile(path.join(__dirname, "client", "build", "index.html")); // relative path
  });
}

// Port Variable
const PORT = process.env.PORT || 5000;

// listenting to server.
app.listen(PORT, () => console.log(`Server is started on PORT : ${PORT}`));
