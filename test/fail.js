var Lab = require('lab');

var it = Lab.test;
var expect = Lab.expect;


it('should fail test', function (done) {

  console.log('\n\n');
  
  expect(true).equal(false);

  done();
});
