var Lab = require('lab');
var Gutil = require('gulp-util');
var Glab = require('../index');
var es = require('event-stream');

var expect = Lab.expect;
var describe = Lab.experiment;
var it = Lab.test;

describe('index', function () {

  it('should return stream', function (done) {

    var stream = Glab();

    expect(Gutil.isStream(stream)).to.equal(true);

    done();
  });

  it('should run truthy test by gulp-lab module with String options', function (done) {

    var stream = Glab('-v -l');

    stream.pipe(es.wait(done));
    stream.end(new Gutil.File({path: './test/truthy.js'}));
  });

  it('should run truthy test by gulp-lab module with Array options', function (done) {

    var stream = Glab(['-s', '-l']);

    stream.pipe(es.wait(done));
    stream.end(new Gutil.File({path: './test/truthy.js'}));
  });

  it('should emit an error if the tests fail', function (done) {

    var stream = Glab('-s -l');
    var failure;

    stream.once('error', function (error) { failure = error; });
    stream.pipe(es.wait(function () {
      expect(failure, 'no error').to.be.an.instanceOf(Error);
      expect(failure.message, 'message').to.match(/exited with errors/i);
      done();
    }));
    stream.end(new Gutil.File({path: './test/fail.js'}));
  });

});
