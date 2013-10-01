#!/usr/bin/env node --harmony
'use strict';
const
  express = require('express'),
  // START:require-redis
  redisClient = require('redis').createClient(),
  RedisStore = require('connect-redis')(express),
  // END:require-redis
  app = express();

app.use(express.logger('dev'));
// START:use-session
app.use(express.cookieParser());
app.use(express.session({
  secret: 'unguessable',
  store: new RedisStore({
    client: redisClient
  })
}));
// START:use-session

app.get('/api/:name', function(req, res) {
  res.json(200, { "hello": req.params.name });
});

app.listen(3000, function(){
  console.log("ready captain.");
});

