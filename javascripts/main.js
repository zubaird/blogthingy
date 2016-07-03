require('./templates/template.js');
require('./templates/posts.js');

var Handlebars = require('handlebars');
var Site = require('./site');
var hbHelpers = require('./templateLoadHelpers');

window.onload = function() {

  var template = hbHelpers.load( ['index', 'head', 'post','1467577467000_somePost'] )

  hbHelpers.loadDomWith('head', template.Head, {title:'It\'s a Blog!'})
  hbHelpers.loadDomWith('#header', template.Index, {title:'======'})
  hbHelpers.loadDomWith('#header', template["1467577467000_somePost"], {title:'AY'})
}
