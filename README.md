# chatapp
A node application for communication over socket

## Usage
- To start the server, run `node server.js`
- To create a client stub, run `node client.js`

## Features
> **Chat**
  - Simply type messages to and send between `client-server`

> **Common Commands**
  - `$clear` - clear console

> **Client Commands**
  - `$change [newName]` - change user name of client

> **Server Commands**
  - `$kick [user] [messsage?]` - kick `user` from server
  - `$connect [user]` - create secure channel to `user`
  - `$disconnect` - disconnect from any connected user
  - `$list` - list all connected users
  - `$search [exp]` - list all connected users matching `exp`

## Hugs or Bugs
chinmaya.cp@gmail.com (contributors are welcome)
