var fs = require('fs');

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

var helpers = {};

module.exports = {
  publishedDateFor: function(postName) {

    return new Promise( (resolve, reject)=> {

      fs.readFile('./postsList.json','utf8',function(err,data) {

        var postList = JSON.parse(data);

        findPostFromList(postName,postList.posts,function(post,index) {

          var publishedDate = post.published;
          var date = new Date(publishedDate).toLocaleString();
          resolve(date);
        })
      })
    })
  },

  getTemplateHelpers: function(postName) {

    return new Promise( (resolve, reject)=> {

      this.publishedDateFor(postName).then( (date)=> {

        helpers.date = date;
        resolve(helpers);
      })
    })
  }
}
