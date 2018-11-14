const net = require("net");
const log = a => console.log(a);

const server = net.createServer();
let pool = {};

server.on("connection", socket => {
    socket.name = `${socket.remoteAddress}:${socket.remotePort}`;
    log(`Connection ${socket.name}`);
    pool[socket.name] = socket;

    socket.setDefaultEncoding("utf-8");
    socket.on("data", d => {
        d = d.toString();
        if(d.charCodeAt(0) == 4 ||d.charCodeAt(0) == 65533) return socket.destroy(); // ctrl+c or ctrl+d

        log(`${socket.name} : ${d}`);
    });
    socket.on("end", ()=>{
        log(`Connection dropped ${socket.name}`);
        delete pool[socket.name];
    });
    socket.on("close", () => {
        log(`Connection closed ${socket.name}`);
        delete pool[socket.name];
    });
});

server.listen(8000, () => log(`Server listening on 8000`));