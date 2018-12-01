const { resolve } = require("url");
const express = require("express");
const request = require("request");
const config = require("config3");
const shortid = require("shortid");

const store = require("./store");

const proxy = to => (req, res, next) => {
  try {
    console.log(resolve(config.brain, to));
    return req
      .pipe(request(resolve(config.brain, to)))
      .on("error", e => {
        console.error(e);
        res.status(500).send(e);
      })
      .pipe(res)
      .on("error", e => {
        console.error(e);
        res.status(500).send(e);
      });
  } catch (e) {
    return next(e);
  }
};

const router = express.Router();

router
  .post("/voice", proxy("/api/voice"))
  .post("/text", proxy("/api/text"))

  .post("/room", (req, res, next) => {
    try {
      const roomid = shortid.generate();
      store.set(roomid, {});

      return res.send(roomid);
    } catch (e) {
      return next(e);
    }
  })
  .get("/room/:roomid", (req, res, next) => {
    try {
      const roomid = req.params.roomid;

      return res.send(store.get(roomid));
    } catch (e) {
      return next(e);
    }
  });

module.exports = router;
