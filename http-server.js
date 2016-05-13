// dependencies

var http = require('http');
var through = require('through2');

// exports

module.exports = {};

// initialization

var upper = through(_toUpper);

var server = http.createServer(_handler);
server.listen(process.argv[2]);

// private methods

function _handler(req, res) {
    if (req.method === 'POST') {
        req.pipe(upper).pipe(res);
    }
    else {
        res.end('I need POST');
    }
}

function _toUpper(buffer, encoding, next) {
    this.push(buffer.toString().toUpperCase());
    next();
}