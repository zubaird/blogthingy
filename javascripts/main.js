require('./templates/template.js');
require('./templates/posts.js');

const Handlebars = require('handlebars');
const Site = require('./site');
const hbHelpers = require('./templateLoadHelpers');

window.onload = function () {
  const template = hbHelpers.loadAll();
  const posts = hbHelpers.loadPosts(4, template);

  hbHelpers.loadDomWith('head', template.Head, { title: Site.title });
  hbHelpers.loadDomWith('#header', template.Index);
  hbHelpers.loadDomWith('#sidebar', template.Sidebar);
  hbHelpers.loadDomWith('.main', template.Posts, { posts, test: 'test' });
};


// preview posts
