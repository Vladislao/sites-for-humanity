const app = require("express")();
const server = require("http").createServer(app);
const io = require("socket.io")(server);

app.get("/", function(req, res) {
  res.send("Hello World");
});

io.on("connection", client => {
  const interval = setInterval(() => {
    client.emit("command", {
      command: "CREATE_NAVBAR",
      props: { position: "top" }
    });
  }, 2000);

  client.on("event", data => {});
  client.on("disconnect", () => {
    clearInterval(interval);
  });
});

server.listen(3000, "0.0.0.0");
