"use strict";
const
  net = require('net'),
  
  report = function(message) {
    let
      type = message[0],
      filename = message[1],
      timestamp = new Date(message[2]);
    switch (type) {
      case 'watching':
        console.log("Now watching: " + filename);
        break;
      case 'changed':
        console.log("File '" + filename + "' changed at " + timestamp);
        break;
      default:
        throw "Unrecognized message type: " + type;
        break;
    }
  };

net.connect({ port: 5432 }, function(){
  
  let buffer = "";
  
  this.on('data', function(data) {
    buffer += data;
    let boundary = buffer.indexOf("\n");
    while (boundary != -1) {
      let input = buffer.substr(0, boundary);
      buffer = buffer.substr(boundary + 1);
      report(JSON.parse(input));
      boundary = buffer.indexOf("\n");
    }
  });
  
});
