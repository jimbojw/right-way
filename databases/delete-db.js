#!/usr/bin/env node --harmony
'use strict';
const
  dbname = process.argv[2],
  db = 'http://localhost:5984/' + dbname;
if (!dbname) {
  throw Error('No database name provided');
}
require('request').del(db, function(err, res, body) {
  console.log(res.statusCode);
  console.log(JSON.parse(body));
});
