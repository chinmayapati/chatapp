const { log } = require("../cli-tools");

function kickUser(sock, msg) {
    if (!pool[sock] || !pool[sock].writable) log(`[kick] Socket is not writable or doesn't exist`);
    else {
        if (msg)
            pool[sock].write(msg);

        pool[sock].destroy();
        log(`[kick] ${sock} kicked from server.`);
    }
}

module.exports = { kickUser };