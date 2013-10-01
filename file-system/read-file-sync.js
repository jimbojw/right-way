    const
      fs = require('fs'),
      data = fs.readFileSync('target.txt');
    process.stdout.write(data.toString());

