"use strict";
const EventEmitter = require('events').EventEmitter;
class LDJClient extends EventEmmiter {
  constructor(stream) {
    
    super();
    
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
    
  }
}

exports.LDJClient = LDJClient;
exports.connect = function(stream){
  return new LDJClient(stream);
};

