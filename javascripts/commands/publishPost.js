var Markdown = require('markdown-to-html').Markdown;
var fs = require('fs');
var path = require('path');

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
    var md = new Markdown();
    var mdPostName = postInfoObject.post.name
    var mdFile = './posts/'+ mdPostName;
    md.bufmax = 2048;

    // Write a header.
    console.log('=====BEGIN WRITING TO HTML=======');
    console.log('working on:', mdFile);

    // Write a trailer at eof.
    md.once('end', function() {
      console.log('=====TASK COMPLETE=======');
      process.exit();
    });

    // var opts = {title: 'File $BASENAME in $DIRNAME', stylesheet: 'test/style.css'};
    md.render(mdFile, {}, function(err) {

      if (err) {
        console.log('>>>Error:' + err);
        process.exit();
      }

      htmlName = mdPostName.slice(0,mdPostName.length-3)

      var directree = path.format({
                        dir: './posts/html',
                        base: htmlName +'.html',
                      });

      console.log('Creating:',path.normalize(directree));

      var htmlpath = path.normalize(directree)

      fs.writeFile(htmlpath,'this is stuff',function(err){
        if (err) {
          throw err;
        }
        var writeSteam =  fs.createWriteStream(htmlpath);
        md.pipe(writeSteam);
        md.pipe(process.stdout);
      });

    });
}



//
// function writeContentToPostsList(post, content) {
//   console.log('NeFILE',post);
//
//   fs.readFile('./postsList.json',function(err,data){
//     console.log('test');
//     if (err) {
//       throw err;
//     }
//
//     var postsData = JSON.parse(data)
//     for (var i = 0; i < postsData.posts.length; i++) {
//
//       if ( postsData.posts[i].name.search(post) ) {
//         console.log('POST INFO:',postsData.posts[i]);
//         postsData.posts[i].content = content
//         var writableData = JSON.stringify(postsData);
//         fs.writeFile(thisFile, writableData, function(err){
//           if (err) {
//             throw err;
//           }
//         })
//       }
//
//     }
//
//
//
//   })
//
// }
