const { log } = require("../cli-tools");

function connectTo(user) {
	connectedUser = user && pool[user] && pool[user].writable ? user : null;
	if(connectedUser) log(`Connected to user ${connectedUser}`, connectedUser);
	else log(`Unable to create secure channel for user ${user}`)
}

function disconnect() {
	log(`Disconnected from ${connectedUser}`);
	connectedUser = null;
}

function listUsers() {
	let matched = Object.keys(pool);
	log(`[${matched}]`, connectedUser);
}

function searchUser(keyword) {
	let users = Object.keys(pool);
	let matched = users.filter(u => u.match(keyword));
	log(`[${matched}]`, connectedUser);
}

module.exports = { connectTo, disconnect, listUsers, searchUser };