// dependencies

var fs = require('fs');

// initialization

var filename = process.argv[2];
fs.createReadStream(filename).pipe(process.stdout);