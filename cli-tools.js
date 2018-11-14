const readline = require("readline");

const rl = readline.createInterface({
    input: process.stdin,
    output: process.stdout,
    terminal: false
});

exports.log = a => process.stdout.write(`\r${a}\n\n> `);
exports.info = a => process.stdout.write(`\r${a}\n`);

exports.getInput = msg => {
    return new Promise((resolve) => {
        process.stdout.write(msg);
        rl.once("line", l => {
            rl.close();
            resolve(l);
        });
    });
}

exports.handleInput = (handle, name) => {
    process.stdout.write(`\n> `);
    rl.on("line", l => {
        if(isNaN(l.charCodeAt(0))) {
            readline.moveCursor(process.stdout, 0, -1);
            readline.clearLine(process.stdout, 1);
            process.stdout.write("> ");
            return;
        }
        readline.moveCursor(process.stdout, 0, -1);
        this.log(`[you]: ${l}`);
        handle(l);
    });
}

exports.clearConsole = () => {
    readline.cursorTo(process.stdout, 0, 0);
    readline.clearScreenDown(process.stdout);
    process.stdout.write("> ");
}

exports.closeHandle = () => {
    rl.close();
}