var Code = require('code');
var Lab = require('@hapi/lab');

var lab = exports.lab = Lab.script();
var it = lab.test;
var expect = Code.expect;


it('should fail test', function () {

  console.log('\n\n');

  expect(true).to.equal(false);

});
