// dependencies

var combine = require('stream-combiner');
var through = require('through2');
var split = require('split');
var zlib = require('zlib');


// exports

module.exports = function () {
    var genre;

    return combine(
        split(),
        through(_group, _end),
        zlib.createGzip()
    );

    // private methods

    function _group(line, encoding, callback) {
        if (line.length === 0) return callback();

        var row = JSON.parse(line);
        if (!row) return callback();

        if (row.type === 'genre') {
            if (genre) {
                this.push(JSON.stringify(genre) + '\n');
            }
            genre = { name: row.name, books: [] };
        } else if (row.type === 'book') {
            genre.books.push(row.name);
        }
        callback();
    }

    function _end(next) {
        if (genre) {
            this.push(JSON.stringify(genre) + '\n');
        }
        next();
    }
};

// initialization