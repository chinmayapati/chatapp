const { log } = require("./cli-tools");
const { exec, serverExec } = require("./commands");
const { send, broadcast } = require("./communication");

function inputHandler(inp) {
	if (inp[0] == "$") {
		serverExec(inp);
	} else if (connectedUser) {
		send(connectedUser, inp);
	}
	else broadcast(`${inp}`);
}

function dataHandler(sock, data) {
	if (data[0] == "$") exec(sock, data);
	else log(`[${sock}]: ${data}`);
}

module.exports = { inputHandler, dataHandler };