var Handlebars = require('handlebars'); 
module.exports=
(function() {
  var template = Handlebars.template, templates = Handlebars.templates = Handlebars.templates || {};
templates['1468253461000_somePost'] = template({"compiler":[7,">= 4.0.0"],"main":function(container,depth0,helpers,partials,data) {
    return "<h1>Title</h1>\n\n<p><em>Published on: false</em></p>\n\n<h1>blah blah blah</h1>";
},"useData":true});
templates['1468352932000_anotherPost'] = template({"compiler":[7,">= 4.0.0"],"main":function(container,depth0,helpers,partials,data) {
    return "<h1>Title</h1>\n\n<p><em>Published on: false</em></p>";
},"useData":true});
templates['1468353428000_postNumeroDos'] = template({"compiler":[7,">= 4.0.0"],"main":function(container,depth0,helpers,partials,data) {
    return "<h1>Title</h1>\n\n<p><em>Published on: Tue Jul 12 2016 14:57:20 GMT-0500 (CDT)</em></p>\n\n<h2>Subheading</h2>\n\n<p><em>italics</em></p>\n\n<p>[somewebstie](&#39;google.com&#39;)</p>";
},"useData":true});
templates['1469566785000_somePost'] = template({"compiler":[7,">= 4.0.0"],"main":function(container,depth0,helpers,partials,data) {
    return "<h1>Title</h1>\n\n<p><em>Published on: false</em></p>\n\n<p>kjlasajlks</p>";
},"useData":true});
})();
