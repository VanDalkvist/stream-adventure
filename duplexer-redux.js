// dependencies

var duplexer = require('duplexer2');
var through = require('through2');

// exports

module.exports = _duplex;

// initialization

// private methods

function _duplex(counter) {
    var counts = {};

    var jsonStream = through.obj(function (row, encoding, callback) {
        counts[row.country] = (counts.hasOwnProperty(row.country) ? counts[row.country] : 0) + 1;

        callback();
    }, function (done) {
        counter.setCounts(counts);
        done();
    });

    return duplexer({ objectMode: true }, jsonStream, counter);
}