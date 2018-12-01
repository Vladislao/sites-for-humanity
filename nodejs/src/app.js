const express = require("express");
const router = require("./router");

const app = express();

app.use("/api", router).use((err, req, res, next) => {
  console.error(err);
  res.status(500).send(err);
});

module.exports = app;
