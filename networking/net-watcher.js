"use strict";
const
  
  fs = require('fs'),
  net = require('net'),
  
  filename = process.argv[2],
  
  server = net.createServer(function(connection) {
    
    // reporting
    // START:reporting
    console.log('Subscriber connected.');
    connection.write("Now watching '" + filename + "' for changes...\n");
    // END:reporting
    
    // listener setup
    // START:listener
    let listener = function() {
      connection.write("File '" + filename + "' changed: " + new Date() + "\n");
    };
    fs.watchFile(filename, listener);
    // END:listener
    
    // cleanup
    // START:onEnd
    connection.on('end', function() {
      console.log('Subscriber disconnected.');
      fs.unwatchFile(filename, listener);
    });
    // END:onEnd
    
  });

if (!filename) {
  throw "No target filename was specified.";
}

// START:bind
server.listen(5432, function() {
  console.log('Listening for subscribers...');
});
// END:bind

