/**
 * author and subject search
 * curl http://localhost:3000/api/search/author?q=Giles
 * curl http://localhost:3000/api/search/subject?q=Croc
 */
// START:content
'use strict';
const request = require('request');
module.exports = function(config, app) {  //<label id="code.field-search.module-exports"/>
  app.get('/api/search/:view', function(req, res) {  //<label id="code.field-search.app-get"/>
    request({  //<label id="code.field-search.request"/>
      method: 'GET',
      url: config.bookdb + '_design/books/_view/by_' + req.params.view,  //<label id="code.field-search.params-view"/>
      qs: {
        startkey: JSON.stringify(req.query.q),  //<label id="code.field-search.query-q"/>
        endkey: JSON.stringify(req.query.q + "\ufff0"),
        group: true
      }
    }, function(err, couchRes, body) {  //<label id="code.field-search.handler"/>
      
      // couldn't connect to CouchDB
      if (err) {
        res.json(502, { error: "bad_gateway", reason: err.code });
        return;
      }
      
      // CouchDB couldn't process our request
      if (couchRes.statusCode !== 200) {
        res.json(couchRes.statusCode, JSON.parse(body));
        return;
      }
      
      // send back just the keys we got back from CouchDB
      res.json(JSON.parse(body).rows.map(function(elem){
        return elem.key;
      }));
      
    });
  });
};
// END:content
