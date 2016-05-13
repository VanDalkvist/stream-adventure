// dependencies

var ws = require('websocket-stream');

// exports

module.exports = {};

// initialization

var stream = ws('ws://localhost:8099');

stream.write('hello\n');
stream.end();

// private methods
