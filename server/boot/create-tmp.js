var fs = require('fs');
var environment = process.env.NODE_ENV || 'development';

fs.stat('../tmp', function(err, stats) {
  if (!stats.isDirectory()) {
    console.log("Creating tmp directory...");
    fs.mkdirSync("../tmp");
  }
});
