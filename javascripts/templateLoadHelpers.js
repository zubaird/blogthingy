var Handlebars = require('handlebars');

module.exports = {

  loadDomWith: function(query, template,templateData) {
    var templateData = templateData || {};
    document.querySelectorAll(query)[0].innerHTML = template(templateData);
  },

  appendDomWith: function(query, template,templateData) {
    var templateData = templateData || {};
    var currentContent = document.querySelectorAll(query)[0].innerHTML
    document.querySelectorAll(query)[0].innerHTML = currentContent += template(templateData);
  },

  capitalize: function(word) {
    return word[0].toUpperCase() + word.slice(1,word.length);
  },

  loadAll: function() {
    var templatesObj = {};
    var templateList = this.templateList();

    for (var i = 0; i < templateList.length; i++) {
      var templateKey = this.capitalize( templateList[i]);
      templatesObj[ templateKey  ] = Handlebars.templates[ templateList[i] ];
    }

    return templatesObj;
  },

  templateList: function(){
    return Object.keys(Handlebars.templates);
  },

  postList: function(){
    var postNames = [];
    var templateList = this.templateList();

    for (var i = 0; i < templateList.length; i++) {
      if (templateList[i].search("_") !== -1) {
        postNames.push(templateList[i]);
      }
    }

    return postNames;
  },

  loadPosts: function(numberOfPosts, template) {
    var postList = this.postList();
    var postCount;

    if (postList.length > numberOfPosts ) {
      postCount = numberOfPosts;
    } else {
      postCount = postList.length;
    }

    var postContent = [];

    for (var i = 0; i < postCount; i++) {
      var post = postList[i]
      postContent.push( template[post]() )
    }

    return postContent;
  }
}
