const { handleInput, log, info } = require("./cli-tools");
const { inputHandler, dataHandler } = require("./handlers");
const net = require("net");

const server = net.createServer();
global.pool = {};
global.connectedUser = null;

server.on("connection", socket => {
    socket.name = `${socket.remoteAddress}:${socket.remotePort}`;
    log(`[info] Incoming connection ${socket.name}`);
    pool[socket.name] = socket;

    socket.write(`Hello ${socket.name}`);
    socket.setDefaultEncoding("utf-8");
    socket.on("data", d => {
        d = d.toString();
        if (d.charCodeAt(0) == 4 || d.charCodeAt(0) == 65533) return socket.destroy(); // ctrl+c or ctrl+d

        dataHandler(socket.name, d);
    });
    socket.on("end", () => {
        log(`Connection dropped ${socket.name}`);
        delete pool[socket.name];
    });
    socket.on("error", e => {
        log(`SocketError [${socket.name}] : ${e.message}`);
        socket.destroy();
    })
});

server.on("error", e => {
    log(`ServerError: ${e.message}`);
});

server.listen(8000, () => {
    info(`Server listening on 8000`);
    handleInput(inputHandler, "you");
});