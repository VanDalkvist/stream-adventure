// dependencies

var crypto = require('crypto');

// exports

module.exports = {};

// initialization

var cryptStream = crypto.createDecipher('aes256', process.argv[2]);
process.stdin.pipe(cryptStream).pipe(process.stdout);

// private methods
