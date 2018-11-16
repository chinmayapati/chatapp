const { clearConsole, log } = require("../cli-tools");
const { addName } = require("./userCommands");
const { kickUser } = require("./adminCommands");
const { connectTo, disconnect, listUsers, searchUser } = require("./serverCommands");
const { parseCliMsg } = require("../utils");

function exec(sock, cmd) {
    let parsed = cmd.substr(1).toLowerCase().split(' ');
    switch (parsed[0]) {
        case "change":
            addName(sock, parsed[1]); break;
        default:
            log(`[exec] ${sock} -- ${cmd}`);
    }
}

function serverExec(cmd) {
    let parsed = cmd.substr(1).toLowerCase().split(' ');
    let msg = parseCliMsg(parsed);
    switch (parsed[0]) {
        case "kick":
            kickUser(parsed[1], msg); break;
		case "clear":
			clearConsole(); break;
        case "connect":
            connectTo(parsed[1]); break;
        case "disconnect":
            disconnect(); break;
        case "list":
            listUsers(); break;
        case "search":
            searchUser(parsed[1]); break;
        default:
            log(`[exec] server -- ${cmd}`);
    }
}

module.exports = { exec, serverExec };