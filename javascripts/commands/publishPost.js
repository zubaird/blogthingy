var markdown = require( 'markdown' ).markdown;
var fs = require('fs');
var path = require('path');
var Handlebars = require('handlebars');
var postHelpers = require('../post_helpers');
var postName = process.argv[2];

publishPost(postName, postToHTML);

function publishPost(postName, toHTML) {
  fs.readFile('./postsList.json', function(err,data) {
    handleError(err);

    var postsData = JSON.parse(data);
    var posts = postsData.posts;
    var postWasFound = false;
    var foundPost;

    for (var i = 0; i < posts.length; i++) {
      var postFromList = removeTimestampAndType(posts[i].name);

      if ( postName === postFromList) {
        postWasFound = true;
        foundPost = {
          name: postFromList,
          post: posts[i],
          index: i
        }
      }

    }

    if (postWasFound) {
      console.log('FOUND POST');
      toHTML(foundPost)
    } else {
      console.error('Post not found, postWasFound:', postWasFound);
    }

  })
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
    var mdPostName = postInfoObject.post.name;
    var mdFile = './posts/'+ mdPostName;
    var basePostName = mdPostName.slice(0,mdPostName.length-3);
    var directree = path.format({
                        dir: './posts/html',
                        base: basePostName +'.html',
                      });
    var htmlPath = path.normalize(directree)

    console.log('Creating:',path.normalize(directree));

    // process handlebars



    fs.readFile(mdFile,'utf8',function(err,data){
      var template = Handlebars.compile(data)(postHelpers);
      var htmlContent = markdown.toHTML(template);
      fs.writeFile(htmlPath,htmlContent,function(err){
        handleError(err);
      });
    })
}
