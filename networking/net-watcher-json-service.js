"use strict";
const
  
  fs = require('fs'),
  net = require('net'),
  
  filename = process.argv[2],
  
  server = net.createServer(function(connection) {
    
    // reporting
    console.log('Subscriber connected.');
    // START_HIGHLIGHT
    connection.write(JSON.stringify({
      type: 'watching',
      file: filename
    }) + "\n");
    // END_HIGHLIGHT
    
    // listener setup
    let listener = function() {
      // START_HIGHLIGHT
      connection.write(JSON.stringify({
        type: 'changed',
        file: filename,
        timestamp: +new Date()
      }) + "\n");
      // END_HIGHLIGHT
    };
    fs.watchFile(filename, listener);
    
    // cleanup
    connection.on('end', function() {
      console.log('Subscriber disconnected.');
      fs.unwatchFile(filename, listener);
    });
  });

if (!filename) {
  throw "No target filename was specified.";
}

server.listen(5432, function() {
  console.log('Listening for subscribers...');
});

