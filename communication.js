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

module.exports = { broadcast, send };