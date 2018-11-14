const net = require("net");
const log = a => console.log(a);

const client = new net.Socket();

client.on("error", e => {
    log(`ConnectError: ${e.message}`);
});

client.connect(8000, "localhost", () => {
    log(`Connected to server.`);

    client.setDefaultEncoding("utf-8");
    client.on("data", d => {
        d = d.toString();
        log(`Server says, ${d}`);
    });

    client.on("close", () => log("Connection closed to server."));
    client.on("end", () => log("Connection dropped to server."));
    client.on("error", e => {
        log(`SocketError: ${e.message}`);
        client.destroy();
    });

});
