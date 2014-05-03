var Spawn = require('child_process').spawn;
var Through2 = require('through2');


module.exports = function (options) {

  var paths = [];
  var args = [process.env.PWD + '/node_modules/.bin/lab'];

  return Through2.obj(function (file, enc, cb) {

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

    Spawn('node', args.concat(paths), {stdio: 'inherit'});

    cb();
  });

}
