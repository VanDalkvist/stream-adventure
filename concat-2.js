// dependencies

var concat = require('concat-stream');

// exports

module.exports = {};

// initialization

process.stdin.pipe(concat(_concat));

// private functions

function _concat(src) {
    process.stdout.write(src.toString().split('').reverse().join(''));
}