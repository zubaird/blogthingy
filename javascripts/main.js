require('./templates/template.js');
require('./templates/posts.js');

var Handlebars = require('handlebars');
var Site = require('./site');
var hbHelpers = require('./templateLoadHelpers');

window.onload = function() {
  var template = hbHelpers.loadAll();

  hbHelpers.loadDomWith('head', template.Head, {title:'It\'s a Blog!'})
  hbHelpers.loadDomWith('#header', template.Index, {title:'======'})
  hbHelpers.loadDomWith('.main', template.Posts, {})
  hbHelpers.loadPosts(4,'.posts', template)
}


// store posts data
// load all templates
// render posts
