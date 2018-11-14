const { handleInput, log, info } = require("./utils");
const net = require("net");

const server = net.createServer();
let pool = {};

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
    socket.on("close", () => {
        log(`Connection closed ${socket.name}`);
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

/** Handlers */
function inputHandler(inp) {
    broadcast(`${inp}`);
}

function dataHandler(sock, data) {
    if (data[0] == "$") exec(sock, data);
    else log(`[${sock}] : ${data}`);
}

/** Application Logic */
function broadcast(msg) {
    for (let i in pool) {
        (pool[i].writable && pool[i].write(`${msg}`))
    }
}

function send(to, msg) {
    if (pool[to] && pool[to].writable) {
        pool[to].write(msg);
    }
}

// Change `name` in `pool` : not in `socket`
function addName(sock, name) {
    if(!name) return send(sock, `Invalid name`);
    else if(pool[name]) return send(sock, `Username exists`);

    pool[sock].name = name;
    pool[name] = pool[sock];
    delete pool[sock];
    log(`[${sock}] changed name to '${name}'`);
}

function exec(sock, cmd) {
    let parsed = cmd.substr(1).toLowerCase().split(' ');
    switch (parsed[0]) {
        case "change":
            addName(sock, parsed[1]);
            break;
        default:
            log(`[exec] ${sock} -- ${cmd}`);
    }
}