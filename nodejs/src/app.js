const express = require("express");
const router = require("./router");

const app = express();

app.post("/api", router);

module.exports = app;
