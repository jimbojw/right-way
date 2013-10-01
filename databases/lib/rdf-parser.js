'use strict';
const
  fs = require('fs'),
  cheerio = require('cheerio');

module.exports = function(filename, callback) {
  fs.readFile(filename, function(err, data){
    
    if (err) {
      callback(err);
      return;
    }
    
    let
      $ = cheerio.load(data.toString()),
      collect = function(index, elem) {
        return $(elem).text();
      };
    
    callback(null, {
      _id: $('pgterms\\:ebook').attr('rdf:about').replace('ebooks/', ''), //<label id="code._id"/>
      title: $('dcterms\\:title').text(), //<label id="code.title"/>
      authors: $('pgterms\\:agent pgterms\\:name').map(collect), //<label id="code.authors"/>
      subjects: $('[rdf\\:resource$="/LCSH"] ~ rdf\\:value').map(collect) //<label id="code.subjects"/>
    });
    
  });
};

