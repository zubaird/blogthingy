var Handlebars = require('handlebars'); 
module.exports=
(function() {
  var template = Handlebars.template, templates = Handlebars.templates = Handlebars.templates || {};
templates['1467611648000_yetAnotherAwsomePost'] = template({"compiler":[7,">= 4.0.0"],"main":function(container,depth0,helpers,partials,data) {
    var helper;

  return "<h1 id=\"-title-\">"
    + container.escapeExpression(((helper = (helper = helpers.title || (depth0 != null ? depth0.title : depth0)) != null ? helper : helpers.helperMissing),(typeof helper === "function" ? helper.call(depth0 != null ? depth0 : {},{"name":"title","hash":{},"data":data}) : helper)))
    + "</h1>\n<h3 id=\"a-blog-maker-for\">A blog maker for</h3>\n<ul>\n<li>Easy templating</li>\n<li>Markdown posts with Handbars ...because!</li>\n<li>Generators</li>\n</ul>\n<h3 id=\"get-started\">Get started</h3>\n<ul>\n<li>Update this file: <code>./javascripts/site.js</code> with your information, then run: <code>npm run-script init</code></li>\n<li>Write your first post: <code>npm run-script make-post helloWorld!</code></li>\n<li>Turn it to HTML: <code>npm run-script compile-posts</code></li>\n<li>Read it: <code>npm run-script beefy</code></li>\n<li>Profit: (Let me know once you&#39;ve figured that part out!)</li>\n</ul>\n<h3 id=\"commands\">Commands</h3>\n<p>  <code>npm run-script [command]</code></p>\n<ul>\n<li>compile: Compiles handlebars templates in the <code>./javascripts/templates</code> directory</li>\n<li>compile-posts: Turn markdown posts to HTML, then compiles any handlebars e.g. <code>{{ }}</code> inside.</li>\n<li>make-post [POST NAME]: Generates a blank markdown post in <code>./posts</code> with a timestamp.</li>\n<li>beefy: Watches working directory</li>\n<li>md-to-html:</li>\n<li>init: Init based on site.js config</li>\n</ul>\n<h3 id=\"uses\">Uses</h3>\n<ul>\n<li>Browserify (dealing with multiple JS files)</li>\n<li>Watchify (watcher to update bundle.js on JS file changes)</li>\n<li>Beefy (watch index.html for changes and serve locally)</li>\n<li>Handlebars (templating and partials)</li>\n</ul>\n";
},"useData":true});
templates['1467612947000_DayZ'] = template({"compiler":[7,">= 4.0.0"],"main":function(container,depth0,helpers,partials,data) {
    return "<h1 id=\"title\">Title</h1>\n<h3 id=\"fo-realz\">Fo Realz</h3>\n";
},"useData":true});
templates['1467638366000_soHeresAnotherOne'] = template({"compiler":[7,">= 4.0.0"],"main":function(container,depth0,helpers,partials,data) {
    return "<h1 id=\"title\">Title</h1>\n<h3 id=\"that-was-a-lot-of-links\">That was a lot of links</h3>\n<p>Lorem ipsum dolor sit amet, consectetur adipisicing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum.</p>\n";
},"useData":true});
templates['1467639894000_thisWasWayTooAwesome'] = template({"compiler":[7,">= 4.0.0"],"main":function(container,depth0,helpers,partials,data) {
    var helper, alias1=depth0 != null ? depth0 : {}, alias2=helpers.helperMissing, alias3="function", alias4=container.escapeExpression;

  return "<h1 id=\"title\">Title</h1>\n<p><strong>this was going to be another "
    + alias4(((helper = (helper = helpers.post || (depth0 != null ? depth0.post : depth0)) != null ? helper : alias2),(typeof helper === alias3 ? helper.call(alias1,{"name":"post","hash":{},"data":data}) : helper)))
    + "</strong><br><strong>this was going to be another "
    + alias4(((helper = (helper = helpers.post || (depth0 != null ? depth0.post : depth0)) != null ? helper : alias2),(typeof helper === alias3 ? helper.call(alias1,{"name":"post","hash":{},"data":data}) : helper)))
    + "</strong><br><strong>this was going to be another "
    + alias4(((helper = (helper = helpers.post || (depth0 != null ? depth0.post : depth0)) != null ? helper : alias2),(typeof helper === alias3 ? helper.call(alias1,{"name":"post","hash":{},"data":data}) : helper)))
    + "</strong><br><strong>this was going to be another "
    + alias4(((helper = (helper = helpers.post || (depth0 != null ? depth0.post : depth0)) != null ? helper : alias2),(typeof helper === alias3 ? helper.call(alias1,{"name":"post","hash":{},"data":data}) : helper)))
    + "</strong><br><strong>this was going to be another "
    + alias4(((helper = (helper = helpers.post || (depth0 != null ? depth0.post : depth0)) != null ? helper : alias2),(typeof helper === alias3 ? helper.call(alias1,{"name":"post","hash":{},"data":data}) : helper)))
    + "</strong><br><strong>this was going to be another "
    + alias4(((helper = (helper = helpers.post || (depth0 != null ? depth0.post : depth0)) != null ? helper : alias2),(typeof helper === alias3 ? helper.call(alias1,{"name":"post","hash":{},"data":data}) : helper)))
    + "</strong><br><strong>this was going to be another "
    + alias4(((helper = (helper = helpers.post || (depth0 != null ? depth0.post : depth0)) != null ? helper : alias2),(typeof helper === alias3 ? helper.call(alias1,{"name":"post","hash":{},"data":data}) : helper)))
    + "</strong><br><strong>this was going to be another "
    + alias4(((helper = (helper = helpers.post || (depth0 != null ? depth0.post : depth0)) != null ? helper : alias2),(typeof helper === alias3 ? helper.call(alias1,{"name":"post","hash":{},"data":data}) : helper)))
    + "</strong><br><strong>this was going to be another "
    + alias4(((helper = (helper = helpers.post || (depth0 != null ? depth0.post : depth0)) != null ? helper : alias2),(typeof helper === alias3 ? helper.call(alias1,{"name":"post","hash":{},"data":data}) : helper)))
    + "</strong><br><strong>this was going to be another "
    + alias4(((helper = (helper = helpers.post || (depth0 != null ? depth0.post : depth0)) != null ? helper : alias2),(typeof helper === alias3 ? helper.call(alias1,{"name":"post","hash":{},"data":data}) : helper)))
    + "</strong><br><strong>this was going to be another "
    + alias4(((helper = (helper = helpers.post || (depth0 != null ? depth0.post : depth0)) != null ? helper : alias2),(typeof helper === alias3 ? helper.call(alias1,{"name":"post","hash":{},"data":data}) : helper)))
    + "</strong><br><strong>this was going to be another "
    + alias4(((helper = (helper = helpers.post || (depth0 != null ? depth0.post : depth0)) != null ? helper : alias2),(typeof helper === alias3 ? helper.call(alias1,{"name":"post","hash":{},"data":data}) : helper)))
    + "</strong><br><strong>this was going to be another "
    + alias4(((helper = (helper = helpers.post || (depth0 != null ? depth0.post : depth0)) != null ? helper : alias2),(typeof helper === alias3 ? helper.call(alias1,{"name":"post","hash":{},"data":data}) : helper)))
    + "</strong><br><strong>this was going to be another "
    + alias4(((helper = (helper = helpers.post || (depth0 != null ? depth0.post : depth0)) != null ? helper : alias2),(typeof helper === alias3 ? helper.call(alias1,{"name":"post","hash":{},"data":data}) : helper)))
    + "</strong><br><strong>this was going to be another "
    + alias4(((helper = (helper = helpers.post || (depth0 != null ? depth0.post : depth0)) != null ? helper : alias2),(typeof helper === alias3 ? helper.call(alias1,{"name":"post","hash":{},"data":data}) : helper)))
    + "</strong><br><strong>this was going to be another "
    + alias4(((helper = (helper = helpers.post || (depth0 != null ? depth0.post : depth0)) != null ? helper : alias2),(typeof helper === alias3 ? helper.call(alias1,{"name":"post","hash":{},"data":data}) : helper)))
    + "</strong><br><strong>this was going to be another "
    + alias4(((helper = (helper = helpers.post || (depth0 != null ? depth0.post : depth0)) != null ? helper : alias2),(typeof helper === alias3 ? helper.call(alias1,{"name":"post","hash":{},"data":data}) : helper)))
    + "</strong><br><strong>this was going to be another "
    + alias4(((helper = (helper = helpers.post || (depth0 != null ? depth0.post : depth0)) != null ? helper : alias2),(typeof helper === alias3 ? helper.call(alias1,{"name":"post","hash":{},"data":data}) : helper)))
    + "</strong><br><strong>this was going to be another "
    + alias4(((helper = (helper = helpers.post || (depth0 != null ? depth0.post : depth0)) != null ? helper : alias2),(typeof helper === alias3 ? helper.call(alias1,{"name":"post","hash":{},"data":data}) : helper)))
    + "</strong><br><strong>this was going to be another "
    + alias4(((helper = (helper = helpers.post || (depth0 != null ? depth0.post : depth0)) != null ? helper : alias2),(typeof helper === alias3 ? helper.call(alias1,{"name":"post","hash":{},"data":data}) : helper)))
    + "</strong><br><strong>this was going to be another "
    + alias4(((helper = (helper = helpers.post || (depth0 != null ? depth0.post : depth0)) != null ? helper : alias2),(typeof helper === alias3 ? helper.call(alias1,{"name":"post","hash":{},"data":data}) : helper)))
    + "</strong></p>\n";
},"useData":true});
})();
