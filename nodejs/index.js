const app = require("./app");
const server = require("http").createServer(app);

require("./socket")(server);

server.listen(3000, "0.0.0.0");
