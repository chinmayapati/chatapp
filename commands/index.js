const { clearConsole, log } = require("../cli-tools");
const { addName } = require("./userCommands");
const { kickUser } = require("./adminCommands");

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

function serverExec(cmd) {
    let parsed = cmd.substr(1).toLowerCase().split(' ');
    switch (parsed[0]) {
        case "kick":
            kickUser(parsed[1], parsed[2]);
			break;
		case "clear":
			clearConsole();
			break;
        default:
            log(`[exec] server -- ${cmd}`);
    }
}

module.exports = { exec, serverExec };