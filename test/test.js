
var Lab = require('lab');

var plugin = require('./../index');

var expect = Lab.expect;
var describe = Lab.experiment;
var it = Lab.test;


describe('index', function () {

  it('should return stream object', function (done) {

    var stream = plugin();

    expect(typeof stream).to.equal('object');
    expect(typeof stream.pipe).to.equal('function');

    done();
  });
});
