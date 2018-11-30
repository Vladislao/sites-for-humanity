const socketio = require("socket.io");

module.exports = server => {
  const io = socketio(server);

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

  return io;
};
