// dependencies

var request = require('request');

// exports

module.exports = {};

// initialization

process.stdin.pipe(request.post('http://localhost:8099')).pipe(process.stdout);

// private methods
