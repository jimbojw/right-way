/**
 * search for books by a given field (author or subject)
 * curl http://localhost:3000/api/search/book/by_author?q=Giles,%20Lionel
 * curl http://localhost:3000/api/search/book/by_subject?q=War
 */
'use strict';
const request = require('request');
module.exports = function(config, app) {
  app.get('/api/search/book/by_:view', function(req, res) {
    request({
      method: 'GET',
      url: config.bookdb + '_design/books/_view/by_' + req.params.view,
      // START:qs
      qs: {
        key: JSON.stringify(req.query.q),
        reduce: false,
        include_docs: true
      }
      // END:qs
    }, function(err, couchRes, body) {
      
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
      
      // send back simplified documents we got from CouchDB
      // START:res
      let books = {};
      JSON.parse(body).rows.forEach(function(elem){
        books[elem.doc._id] = elem.doc.title;
      });
      res.json(books);
      // END:res
      
    });
  });
};
