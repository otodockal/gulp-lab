var Spawn = require('child_process').spawn;
var Through2 = require('through2');
var Join = require('path').join;
var PluginError = require('gulp-util').PluginError;

var PLUGIN_NAME = 'gulp-lab';

module.exports = function (options) {

  var paths = [];

  // We expect that lab was declared as a project dependencies, and run directly its main script
  // this way, it can be executed on every platform.
  var args = [Join(process.cwd(), 'node_modules', 'lab', 'bin', 'lab')];

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
    var child = Spawn('node', args.concat(paths), {stdio: 'inherit'});
    var stream = this;

    child.on('exit', function (code) {
      if (code !== 0) {
        stream.emit('error', new PluginError(PLUGIN_NAME, 'Lab exited with errors.'));
      }
      cb();
    });

  });

}
