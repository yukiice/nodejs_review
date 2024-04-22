const express = require("express");
const app = express();

app.use(function (req, res, next) {
  console.log(Date.now(), "time");
  const err = new Error("Something went wrong");
  next(err);
});

app.use(function (req, res, next) {
  console.log("This is the second middleware");
  next();
});
app.use(function (err, req, res, next) {
  console.error(err.stack);
  res.status(500).send("Something broke!");
});

app.get("/", function (req, res) {
  res.send("Hello World");
});

app.listen(3000, () => {
  console.log("Server is running on port 3000");
});
