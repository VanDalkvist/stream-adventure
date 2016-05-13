// dependencies

var spawn = require('child_process').spawn;
var duplexer = require('duplexer2');

// exports

module.exports = _duplex;

// initialization

// private methods

function _duplex(cmd, args) {
    var child = spawn(cmd, args);
    return duplexer(child.stdin, child.stdout);
}