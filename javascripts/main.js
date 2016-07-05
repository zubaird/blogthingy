require('./templates/template.js');
require('./templates/posts.js');

var Handlebars = require('handlebars');
var Site = require('./site');
var hbHelpers = require('./templateLoadHelpers');

window.onload = function() {
  var template = hbHelpers.loadAll();
  var posts = hbHelpers.loadPosts(4, template)

  hbHelpers.loadDomWith('head', template.Head, {title:'It\'s a Blog!'});
  hbHelpers.loadDomWith('#header', template.Index, {title:"posts"});
  console.log(posts);
  hbHelpers.loadDomWith('.main', template.Posts, {posts:posts, test:'test'});
}


// store posts data

// load all templates (DONE)

// render posts if published

// publish post
  // add to list and sort by date

// remove post
  // remove from list

// draft post
