const { send } = require("../communication");
const { log } = require("../cli-tools");

// Change `name` in `pool` : not in `socket`
function addName(sock, name) {
    if (!name) return send(sock, `Invalid name`);
    else if (pool[name]) return send(sock, `Username exists`);

    pool[sock].name = name;
    pool[name] = pool[sock];
    delete pool[sock];
    log(`[${sock}] changed name to '${name}'`);
}

module.exports = { addName };