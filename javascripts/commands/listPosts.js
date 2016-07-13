const fs  = require('fs');

fs.readFile('./postsList.json','utf8',function(err,data) {

  console.log(data);

})
