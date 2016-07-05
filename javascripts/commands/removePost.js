var fs = require('fs');
var path = require('path');
var postName = process.argv[2];


deletePostFile(postName);
removePostFromPostListJSON(postName);

function findPostFromList(name,list,cb) {
  for (var i = 0; i < list.length; i++) {
    var postFromList = removeTimestampAndType(list[i].name);
    if ( name === postFromList ) {
      cb(list[i], i)
    }
  }
}

function removeTimestampAndType(name) {
  const NAMEMATCH = /_([^\.]+)/
  var matches = name.split(NAMEMATCH);;
  return matches[1]
}

function handleError(err) {
  if (err) {
    throw err;
  }
}

function removePostFromPostListJSON(name) {
  console.log('*************************************************************');
  console.log('****START: remove post from postList.json****');
  var file = './postsList.json'

  fs.readFile(file,'utf8',function(err,data){
    var postsList = JSON.parse(data);
    var posts = postsList.posts;
    var updatedContent;

    console.log('SEARCHING:', name)
    findPostFromList(name,posts,function(post,index){
      console.log('REMOVING:', name, 'from', posts)
      posts.splice(index,1);
    })

    updatedContent = JSON.stringify(postsList)
    console.log('UPDATING: postList.json')
    fs.writeFile(file,updatedContent,function(err){
      handleError(err);
      console.log('****COMPLETE: removed ', name,' from postList.json****');
    });

  })
}

function deletePostFile(name){
  var file = './postsList.json'

  fs.readFile(file,'utf8',function(err,data){
    var postsList = JSON.parse(data);
    var posts = postsList.posts;
    var updatedContent;
    var path;

    console.log('SEARCHING:', name)
    findPostFromList(name,posts,function(post,index){
      console.log(post);
      path = './posts/' + post.name
    })

    updatedContent = JSON.stringify(postsList)
    console.log('DELETE:', path)
    fs.unlink(path,function(err){
      handleError(err)
    })
  })
}
