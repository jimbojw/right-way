"use strict";
const
  fs = require('fs'),
  spawn = require('child_process').spawn,
  
  // begin watching the specified file
  // START:startWatching
  startWatching = function(filename) {
    fs.watchFile(filename, function() {
      let ls = spawn('ls', ['-lh', filename]);
      ls.stdout.pipe(process.stdout);
    });
    console.log("Now watching " + filename + " for changes...");
  };
  // END:startWatching

// buffered input to scan for file names
let input = '';

// scan standard input for files to watch, one per line
// START:process
process.stdin.on('data', function(chunk){
  input += chunk;
  while (input.indexOf("\n") >= 0) {
    let filename = input.substr(0, input.indexOf("\n"));
    startWatching(filename);
    input = input.substr(filename.length + 1);
  }
});
// END:process
process.stdin.resume();

