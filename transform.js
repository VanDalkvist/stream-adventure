// dependencies

var through = require('through2');

// exports

module.exports = {};

// initialization

var transform = through(_write);

process.stdin.pipe(transform).pipe(process.stdout);

// private methods

function _write(buffer, encoding, next) {
    this.push(buffer.toString().toUpperCase());
    next();
}