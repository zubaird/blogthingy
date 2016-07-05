var fs = require('fs');

var name = process.argv[2];
var stamp = makeTimestamp()
var stampedName = stampedName(name);

function stampedName(postName) {
  return stamp + "_" + postName + ".md"
}

function makeTimestamp() {
  return Date.parse( new Date() )
}

function fullPath(path) {
  return path + stampedName
}

function writeToPostsList(thisFile) {
  fs.readFile(thisFile,'utf8',function(err,data){
    var postsData = JSON.parse(data)

    postsData.posts.push({
      name: stampedName,
      content: "",
      date: new Date(stamp),
      published: false
    })
    var writableData = JSON.stringify(postsData);
    fs.writeFile(thisFile, writableData, function(err){
      if (err) {
        throw err;
      }
    })

  })
}

var content = '# Title';

fs.writeFile(fullPath('./posts/'), content);

writeToPostsList('./postsList.json');
