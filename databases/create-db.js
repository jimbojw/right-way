#!/usr/bin/env node --harmony
require('request').put('http://localhost:5984/books', function(err, res, body) {
  console.log(res.statusCode);
  console.log(JSON.parse(body));
});


