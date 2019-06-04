var child_process = require('child_process');
var EventEmitter = require('events').EventEmitter;
var Code = require('code');
var Lab = require('@hapi/lab');
var Vinyl = require('vinyl');
var Glab = require('../index');
var Stream = require('stream');
var es = require('event-stream');
var sinon = require('sinon');

var lab = exports.lab = Lab.script();
var after = lab.after;
var before = lab.before;
var expect = Code.expect;
var describe = lab.experiment;
var it = lab.test;

function noop() {}

describe('index', function () {

  it('should return stream', function () {

    var stream = Glab();

    expect(stream instanceof Stream).to.equal(true);
  });

  it('should run truthy test by gulp-lab module with String options', function () {

    var stream = Glab('-v -l');

    stream.pipe(es.wait(noop));
    stream.end(new Vinyl({path: './test/truthy.js'}));
  });

  it('should run truthy test by gulp-lab module with Array options', function() {

    var stream = Glab(['-v', '-l']);

    stream.pipe(es.wait(noop));
    stream.end(new Vinyl({path: './test/truthy.js'}));
  });

  it('should emit an error if options object is passed with missing opts property', function () {

    var failure;
    var stream = Glab({
      args: '-s -l'
    });

    stream.once('error', function (error) { failure = error; });
    stream.pipe(es.wait(function () {
      expect(failure, 'no error').to.be.an.instanceOf(Error);
      expect(failure.message, 'message').to.match(/Object property "opts" must be an object!/i);
    }));
    stream.end();
  });

  it('should emit an error if options object is passed with missing emitLabError property', function () {

    var failure;
    var stream = Glab({
      args: '-s -l',
      opts: {}
    });

    stream.once('error', function (error) { failure = error; });
    stream.pipe(es.wait(function () {
      expect(failure, 'no error').to.be.an.instanceOf(Error);
      expect(failure.message, 'message').to.match(/Object property "emitLabError" must be a boolen!/i);
    }));
    stream.end();
  });

  it('should emit an error if options object is passed with NON boolean emitLabError property', function () {

    var failure;
    var stream = Glab({
      args: '-s -l',
      opts: {
        emitLabError: 'true'
      }
    });

    stream.once('error', function (error) { failure = error; });
    stream.pipe(es.wait(function () {
      expect(failure, 'no error').to.be.an.instanceOf(Error);
      expect(failure.message, 'message').to.match(/Object property "emitLabError" must be a boolen!/i);
    }));
    stream.end();
  });

  it('should emit an error if the test fail', function () {

    var failure;
    var stream = Glab({
      args: '-s -l',
      opts: {
        emitLabError: true
      }
    });

    stream.once('error', function (error) { failure = error; });
    stream.pipe(es.wait(function () {
      expect(failure, 'no error').to.be.an.instanceOf(Error);
      expect(failure.message, 'message').to.match(/exited with errors/i);
    }));
    stream.end(new Vinyl({path: './test/fail.js'}));
  });

  it('should NOT emit an error if the test fail', function () {

    var failure;
    var stream = Glab({
      args: '-s -l',
      opts: {
        emitLabError: false
      }
    });

    stream.once('error', function (error) { failure = error; });
    stream.pipe(es.wait(function () {
      expect(failure).to.equal(undefined);
    }));
    stream.end(new Vinyl({path: './test/fail.js'}));
  });

  it('should emit an error if the test fail - missing args', function () {

    var failure;
    var stream = Glab({
      opts: {
        emitLabError: true
      }
    });

    stream.once('error', function (error) { failure = error; });
    stream.pipe(es.wait(function () {
      expect(failure, 'no error').to.be.an.instanceOf(Error);
      expect(failure.message, 'message').to.match(/exited with errors/i);
    }));
    stream.end(new Vinyl({path: './test/fail.js'}));
  });

  it('should NOT emit an error if the test fail - missing args', function () {

    var failure;
    var stream = Glab({
      opts: {
        emitLabError: false
      }
    });

    stream.once('error', function (error) { failure = error; });
    stream.pipe(es.wait(function () {
      expect(failure).to.equal(undefined);
    }));
    stream.end(new Vinyl({path: './test/fail.js'}));
  });

  it('should emit an error when running fail with Array arguments and filter on tests', function () {

    var failure;
    var stream = Glab({
      args: ['-s', '-l', '-g should fail test'],
      opts: {
        emitLabError: true
      }
    });

    stream.once('error', function (error) { failure = error; });
    stream.pipe(es.wait(function () {
      expect(failure, 'no error').to.be.an.instanceOf(Error);
      expect(failure.message, 'message').to.match(/exited with errors/i);
    }));
    stream.end(new Vinyl({path: './test/fail.js'}));
  });

  describe('spawning the Lab process', function () {

    var argv;
    var path;
    var spawn;

    before(function () {
      var child = new EventEmitter();
      var stream;

      argv = process.execArgv;
      path = process.execPath;
      spawn = sinon.stub(child_process, 'spawn').returns(child);

      process.execArgv = [ '--harmony' ];
      process.execPath = 'nodejs';

      // Returned stream should never do anything since spawn is stubbed out.
      stream = Glab('-d -s -l');
      stream.pipe(es.wait(noop));
      stream.end(new Vinyl({path: '/test/truthy.js' }));
      child.emit('exit', 0);
    });

    after(function () {
      spawn.restore();
      process.execArgv = argv;
      process.execPath = path;
    });

    it('invokes the child with the same node arguments as the parent', function () {
      expect(spawn.calledOnce, 'spawn not called').to.be.true;
      expect(spawn.firstCall.args[0], 'wrong command').to.equal('nodejs');
      expect(spawn.firstCall.args[1][0], 'bad argument').to.equal('--harmony');
    });
  });

});
