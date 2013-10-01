    const
      fs = require('fs'),
      text = JSON.stringify(process.argv.slice(2));
    
    fs.writeFile('target.txt', text, function (err) {
      if (err) throw err;
      console.log("Parameters saved");
    });

