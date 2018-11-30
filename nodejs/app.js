const app = require("express")();
const request = require("request");

app.post("/api/voice", (req, res) => {
  try {
    req.pipe(request());
  } catch (e) {
    next(e);
  }
});

module.exports = app;
