// dependencies

var through2 = require('through2');
var concat = require('concat-stream');

// exports

module.exports = {};

// initialization

var pieces = [];
process.stdin.pipe(through2(_transform)).pipe(concat(_concat));

// private methods

function _transform(buf, enc, next) {
    var piece = buf.toString().split('').reverse().join('');
    pieces.push(piece);
    this.push(piece);
    next();
}

function _concat(res) {
    process.stdout.write(pieces.reverse().join(''));
}