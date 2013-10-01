"use strict";
const
  net = require('net'),
  
  server = net.createServer(function(connection) {
    
    console.log('Time subscriber connected');
    
    // START:setInterval
    let timer = setInterval(function(){
      connection.write("Current date and time: " + new Date() + "\n");
    }, 1000);
    // END:setInterval
    
    // START:onEnd
    connection.on('end', function() {
      console.log('Time subscriber disconnected');
      clearTimeout(timer);
    });
    // END:onEnd
    
  });

// START:listen
server.listen(5432, function() {
  console.log('Time server listening for subscribers...');
});
// END:listen
