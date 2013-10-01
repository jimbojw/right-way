"use strict";
const
  events = require('events'),
  util = require('util'),
  
  // client constructor
  // START:ldjClientIntro
  LDJClient = function(stream) {
    
    events.EventEmitter.call(this);
    // END:ldjClientIntro
    
    // START:ldjClientContent
    let
      self = this,
      buffer = "";
    
    stream.on('data', function(data) {
      buffer += data;
      let boundary = buffer.indexOf("\n");
      while (boundary != -1) {
        let input = buffer.substr(0, boundary);
        buffer = buffer.substr(boundary + 1);
        self.emit('message', JSON.parse(input));
        boundary = buffer.indexOf("\n");
      }
    });
    // END:ldjClientContent
    
  };

// START:inherits
util.inherits(LDJClient, events.EventEmitter);
// END:inherits

// expose module methods
// START:exports
exports.LDJClient = LDJClient;
exports.connect = function(stream){
  return new LDJClient(stream);
};
// END:exports

