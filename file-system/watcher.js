
const fs = require('fs');

fs.watchFile('target.txt', function() {
  console.log("File 'target.txt' just changed!");
});

console.log("Now watching target.txt for changes...");


