// dependencies

var crypto = require('crypto');
var concat = require('concat-stream');
var through = require('through2');
var zlib = require('zlib');
var tar = require('tar');

// exports

module.exports = {};

// initialization

var entries = {};

var parser = tar.Parse();
parser.on('entry', function (entry) {
    entries[entry.path] = entry;
});

var decryptStream = crypto.createDecipher(process.argv[2], process.argv[3]);

process.stdin
    .pipe(decryptStream)
    .pipe(zlib.createGunzip())
    .pipe(parser)
    .pipe(through(function () {
    }, function _end(next) {
        var res = this;

        for (var key in entries) {
            if (entries.hasOwnProperty(key)) {
                var hash = crypto.createHash('md5', { encoding: 'hex' });

                var entry = entries[key];

                entry.on('readable', updateHash(entry, key, hash, res));
            }
        }

        function updateHash(entry, key, hash, res) {
            return function () {
                var data = entry.read();
                if (data)
                    hash.update(data);
                else {
                    res.push(hash.digest('hex') + ' ' + key + '\n');
                }
            }
        }

        next();
    }))
    .pipe(process.stdout);

// private methods
