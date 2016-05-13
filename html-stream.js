// dependencies

var through = require('through2');
var trumpet = require('trumpet');
var fs = require('fs');

// exports

module.exports = {};

// initialization

var tr = trumpet();

var html = tr.select('.loud').createStream();

html.pipe(through(_toUpper)).pipe(html);

process.stdin.pipe(tr);
tr.pipe(process.stdout);

// private methods

function _toUpper(buf, enc, next) {
    this.push(buf.toString().toUpperCase());
    next();
}