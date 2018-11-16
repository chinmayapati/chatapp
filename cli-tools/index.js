const readline = require("readline");

const rl = readline.createInterface({
    input: process.stdin,
    output: process.stdout,
    terminal: false
});

exports.log = (msg, user) => process.stdout.write(`\r${msg}\n\n> ${user ? '(' + user + ') ' : ''}`);
exports.info = msg => process.stdout.write(`\r${msg}\n`);

exports.getInput = msg => {
    return new Promise((resolve) => {
        process.stdout.write(msg);
        rl.once("line", l => {
            rl.close();
            resolve(l);
        });
    });
}

exports.handleInput = (handle) => {
    process.stdout.write(`\n> `);
    rl.on("line", l => {
        // ENTER pressed
        if(isNaN(l.charCodeAt(0))) {
            readline.moveCursor(process.stdout, 0, -1);
            readline.clearLine(process.stdout, 1);
            this.log('', global.connectedUser);
            return;
        }
        readline.moveCursor(process.stdout, 0, -1);
        this.log(`[you]: ${l}`, global.connectedUser);
        handle(l);
    });
}

exports.clearConsole = () => {
    readline.cursorTo(process.stdout, 0, 0);
    readline.clearScreenDown(process.stdout);
    this.log('', global.connectedUser);
}

exports.closeHandle = () => rl.close();