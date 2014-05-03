var Lab = require('lab');
var Gutil = require('gulp-util');
var Glab = require('./../index');

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

    stream.write(new Gutil.File({path: './test/truthy.js'}));
    stream.end();

    done();
  });

  it('should run truthy test by gulp-lab module with Array options', function (done) {

    var stream = Glab(['-s', '-l']);

    stream.write(new Gutil.File({path: './test/truthy.js'}));
    stream.end();

    done();
  });

});