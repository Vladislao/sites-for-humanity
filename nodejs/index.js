const app = require("./src/app");
const server = require("http").createServer(app);

require("./src/socket")(server);

server.listen(3000, "0.0.0.0");
