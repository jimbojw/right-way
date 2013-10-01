"use strict";
const
  fs = require('fs'),
  spawn = require('child_process').spawn,
  
  // synchronously read the list of files to watch
  watchables = fs.readFileSync('watchables.txt').toString().split("\n");

watchables.forEach(function(filename){
  fs.watchFile(filename, function() {
    let ls = spawn('ls', ['-lh', filename]);
    ls.stdout.pipe(process.stdout);
  });
  console.log("Now watching " + filename + " for changes...");
});
