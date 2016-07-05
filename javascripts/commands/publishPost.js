var markdown = require( 'markdown' ).markdown;
var fs = require('fs');
var path = require('path');
var Handlebars = require('handlebars');
var postHelpers = require('../post_helpers');
var postName = process.argv[2];


publishPost(postName, postToHTML)
  .then(postToHTML)
  .then(addPublishedToJSONList)

function publishPost(postName, toHTML) {

  return new Promise(function(resolve,reject) {
    fs.readFile('./postsList.json', function(err,data) {
      handleError(err);

      var postsData = JSON.parse(data);
      var posts = postsData.posts;
      var postWasFound = false;
      var foundPost;

      findPostFromList(postName,posts,function(post,index) {
        postWasFound = true;
        foundPost = {
          name: removeTimestampAndType(post.name),
          post: post,
          index: index
        }
      })

      if (postWasFound) {
        console.log('...post was found');
        resolve(foundPost);
      } else {
        console.error('Post not found, postWasFound:', postWasFound);
      }

    })
  })

}

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

function postToHTML(postInfoObject){
  console.log('*************************************************************');
  console.log('****START: post to HTML****');
  return new Promise(function(resolve,reject) {
    var mdPostName = postInfoObject.post.name;
    var mdFile = './posts/'+ mdPostName;
    var basePostName = mdPostName.slice(0,mdPostName.length-3);
    var directree = path.format({
                        dir: './posts/html',
                        base: basePostName +'.html',
                      });
    var htmlPath = path.normalize(directree)

    console.log('CREATE:',path.normalize(directree));
    fs.readFile(mdFile,'utf8',function(err,data){

      console.log('TEMPLATE: adding available data');
      var template = Handlebars.compile(data)(postHelpers);

      console.log('MODIFY: adding markdown post to HTML file');
      var htmlContent = markdown.toHTML(template);

      fs.writeFile(htmlPath,htmlContent,function(err){
        handleError(err);
        console.log('****COMPLETE: post to HTML****');
        resolve(postInfoObject);
      });
    })
  })

}

function addPublishedToJSONList(postInfoObject) {
  console.log('*************************************************************');
  console.log('****START: update postList.json****');
  return new Promise(function(resolve,reject) {
    var file = './postsList.json'

    fs.readFile(file,'utf8',function(err,data){
      var postsList = JSON.parse(data);
      var posts = postsList.posts;
      var updatedContent;

      console.log('SEARCHING:', postInfoObject.name)
      findPostFromList(postInfoObject.name,posts,function(post,index){
        posts[index].published = Date.parse( new Date() );
      })

      console.log('SORTING: postList.json by published date')
      posts.sort(function(a,b){
        return a.published < b.published;
      })

      updatedContent = JSON.stringify(postsList)
      console.log('UPDATING: postList.json')
      fs.writeFile(file,updatedContent,function(err){
        handleError(err);
        console.log('****COMPLETE: update postList.json****');
      });

    })
  })
}
