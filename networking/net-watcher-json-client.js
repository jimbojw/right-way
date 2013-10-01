"use strict";
const
  net = require('net'),
  client = net.connect({port: 5432});

// START:dataParse
client.on('data', function(data) {
  
  let
    message = JSON.parse(data),
    date = new Date(message.timestamp);
// END:dataParse
  
  if (message.type === 'watching') {
    console.log("Now watching: " + message.file);
  } else if (message.type === 'changed') {
    console.log("File '" + message.file + "' changed at " + date);
  } else {
    throw "Unrecognized message type: " + message.type;
  }
  
});

