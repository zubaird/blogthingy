var fs = require('fs');
var postList;

fs.readFile('./postsList.json','utf8',function(err,data) {
  postList = JSON.parse(data);
})

function removeTimestampAndType(name) {
  const NAMEMATCH = /_([^\.]+)/
  var matches = name.split(NAMEMATCH);;
  return matches[1]
}

function findPostFromList(name,list,cb) {
  for (var i = 0; i < list.length; i++) {
    var postFromList = removeTimestampAndType(list[i].name);
    if ( name === postFromList ) {
      cb(list[i], i)
    }
  }
}


module.exports = {
  publishedDateFor:function(postName) {
    console.log(postName);
    var publishedDate;

    findPostFromList(postName,postList.posts,function(post,index) {
      console.log(post);
       publishedDate = post.published;
    })
    
    var date = publishedDate
    console.log('PUBLISHED DATE:',publishedDate);
    return date;
  }
}
