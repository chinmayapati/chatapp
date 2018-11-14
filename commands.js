const { send } = require("./communication");

// Change `name` in `pool` : not in `socket`
function addName(sock, name) {
    if (!name) return send(sock, `Invalid name`);
    else if (pool[name]) return send(sock, `Username exists`);

    pool[sock].name = name;
    pool[name] = pool[sock];
    delete pool[sock];
    log(`[${sock}] changed name to '${name}'`);
}

function kickUser(sock, msg) {
    if (!pool[sock] || !pool[sock].writable) log(`[kick] Socket is not writable or doesn't exist`);
    else {
        if (msg)
            pool[sock].write(msg);

        pool[sock].destroy();
        log(`[kick] ${sock} kicked from server.`);
    }
}

function exec(sock, cmd) {
    let parsed = cmd.substr(1).toLowerCase().split(' ');
    switch (parsed[0]) {
        case "change":
            addName(sock, parsed[1]);
            break;
        case "kick":
            kickUser(sock, authid);
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
        default:
            log(`[exec] server -- ${cmd}`);
    }
}

module.exports = { exec, serverExec };