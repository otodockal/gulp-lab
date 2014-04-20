var spawn = require('child_process').spawn;
var through2 = require('through2');


module.exports = function (options) {

  var paths = [];
  var args = [process.env.PWD + '/node_modules/.bin/lab'];

  return through2.obj(function (file, enc, cb) {

    paths.push(file.path);

    this.push(file);

    cb();

  }, function (cb) {

    // Set options

    if (Array.isArray(options)) {

      args = args.concat(options);

    } else if (typeof options === 'string') {

      args = args.concat(options.split(' '));
    }

    // Spawn process

    spawn('node', args.concat(paths), {stdio: 'inherit'});

    cb();
  });

}
