const readline = require("readline");

const rl = readline.createInterface(process.stdin, process.stdout, completer);

function completer(line) {
    const completions = '$kick $connect $disconnect $list $search $clear'.split(' ')
    const hits = completions.filter(c => c.indexOf(line) == 0);
    // show all completions if none found
    return [hits.length ? hits : [], line]
}

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
            readline.clearScreenDown(process.stdout);
            process.stdout.write(`> ${global.connectedUser ? '('+global.connectedUser+') ' : '' }`);
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