/**
 * test-api-bundle.js
 */

var request = require('request');

exports['create bundle'] = function(test) {
  
  test.expect(1);
  
  request({
    method: 'POST',
    url: 'http://localhost:3000/api/bundle/integration test bundle'
  }, function (err, res, body) {
    console.log(body);
    test.done();
  });
  
  
};

/*
$ curl 'http://localhost:3000/api/bundle/bc2a1174e39f0fb4fc5efadd310006f1'

$ curl -X PUT -H 'Content-Type: application/json' -d '{"_id":"132","title":"The Art of War"}' 'http://localhost:3000/api/bundle/bc2a1174e39f0fb4fc5efadd310006f1/book'

$ curl -X DELETE 'http://localhost:3000/api/bundle/bc2a1174e39f0fb4fc5efadd310006f1/book/132'
*/
