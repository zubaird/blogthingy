require('./templates/template.js');
require('./templates/posts.js');

var Handlebars = require('handlebars');
var Site = require('./site');
var hbHelpers = require('./templateLoadHelpers');

window.onload = function() {
  var template = hbHelpers.loadAll();
  var posts = hbHelpers.loadPosts(4, template)

  hbHelpers.loadDomWith('head', template.Head, {title: Site.title });
  hbHelpers.loadDomWith('#header', template.Index, {title:"posts"});
  console.log(posts);
  hbHelpers.loadDomWith('.main', template.Posts, {posts:posts, test:'test'});
}
