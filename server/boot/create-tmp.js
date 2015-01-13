var fs = require('fs');

fs.stat('../tmp', function(err, stats) {
  if (stats && !stats.isDirectory()) {
    console.log("Creating tmp directory...");
    fs.mkdirSync("../tmp");
  }
});
