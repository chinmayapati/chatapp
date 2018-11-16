function parseCliMsg(parsed) {
	let msg = parsed.slice(2).join(" ");
    let start = msg[0] == '"' || msg[0] == "'" ? 1 : 0;
    let end = msg[msg.length-1] == '"' || msg[msg.length-1] == "'" ? msg.length-2 : msg.length-1;
    return msg.substr(start, end);
}

module.exports = { parseCliMsg };