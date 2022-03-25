# discord-bot-test

A simple node.js discord bot. Basically a playground for me.

## Setup

Rename `.env.sample` to `.env` and add the token there.

Change `config.sample.json` to `config.json`, and add the params.

### Server

You can delete `server.js` and remove

```js
// Server
const keepAlive = require("./server.js");

...

keepAlive()
```

if you are selfhosting this. Otherwise, if you are using [Glitch](https://glitch.com), [Repl.it](https://replit.com) or something, you'll need this to keep it alive (also UptimeRobot, too)

## Commands

- `ping`: replies with `Pong!`
- `echo`: echos the input
  - `input` - the input
- `info` - replies information about...
  - `server` - ...the server
  - `user` - ...a user