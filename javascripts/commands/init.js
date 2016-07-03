var fs = require('fs');
var site = require('../site')

var initPostList = {
  title: site.title,
  keywords: site.keywords
}

var content = JSON.stringify(initPostList)

fs.writeFile('./postsList.json',content);
