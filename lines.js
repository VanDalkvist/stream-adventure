// dependencies

var through2 = require('through2');
var split = require('split');

// exports

module.exports = {};

// initialization

var context = {
    counter: 0
};

process.stdin
    .pipe(split())
    .pipe(through2(_transform))
    .pipe(process.stdout);

// private methods

function _transform(line, _, next) {
    context.counter += 1;
    var content = line.toString() + '\n';
    this.push(((2 + context.counter) % 2 === 0) ? content.toUpperCase() : content.toLowerCase());
    next();
}