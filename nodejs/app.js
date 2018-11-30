const { resolve } = require("url");
const app = require("express")();
const request = require("request");
const config = require("config3");

app.post("/api/voice", (req, res, next) => {
  try {
    return req
      .pipe(request(resolve(config.brain, "/api/voice")))
      .on("error", e => {
        console.error(e);
      })
      .pipe(res)
      .on("error", e => {
        console.error(e);
      });
  } catch (e) {
    return next(e);
  }
});

module.exports = app;
