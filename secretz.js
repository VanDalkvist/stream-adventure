// dependencies

var crypto = require('crypto');
var concat = require('concat-stream');
var zlib = require('zlib');
var tar = require('tar');

// exports

module.exports = {};

// initialization

var parser = tar.Parse();
parser.on('entry', function (entry) {
    if (entry.type !== 'File') return;

    var hash = crypto.createHash('md5', { encoding: 'hex' });
    entry.pipe(hash).pipe(concat(function (hash) {
        console.log(hash + ' ' + entry.path);
    }));
});

var decryptStream = crypto.createDecipher(process.argv[2], process.argv[3]);

process.stdin
    .pipe(decryptStream)
    .pipe(zlib.createGunzip())
    .pipe(parser);