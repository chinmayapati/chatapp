const net = require("net");
const { handleInput, log, info, clearConsole } = require("./cli-tools");

const client = new net.Socket();

client.on("error", e => {
    info(`ConnectError: ${e.message}`);
    process.exit(1);
});

client.connect(8000, "localhost", () => {
    info(`Connected to server.`);
    handleInput(send);

    client.setDefaultEncoding("utf-8");
    client.on("data", d => {
        d = d.toString();
        log(`[server]: ${d}`);
    });

    client.on("close", () => { info("Connection closed to server."); process.exit(0); });
    client.on("end", () => { info("Connection dropped to server."); process.exit(0); });
    client.on("error", e => {
        log(`SocketError: ${e.message}`);
        client.destroy();
        process.exit(1);
    });

});

/** Application Logic */
function send(msg) {
    if(msg.toLowerCase() == "$clear") return clearConsole();
    client.write(msg);
}