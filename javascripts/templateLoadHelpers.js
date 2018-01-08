const Handlebars = require('handlebars');

module.exports = {

  loadDomWith(query, template, templateData) {
    let templateData = templateData || {};
    document.querySelectorAll(query)[0].innerHTML = template(templateData);
  },

  appendDomWith(query, template, templateData) {
    let templateData = templateData || {};
    let currentContent = document.querySelectorAll(query)[0].innerHTML;
    document.querySelectorAll(query)[0].innerHTML = currentContent += template(templateData);
  },

  capitalize(word) {
    return word[0].toUpperCase() + word.slice(1, word.length);
  },

  loadAll() {
    const templatesObj = {};
    const templateList = this.templateList();

    for (let i = 0; i < templateList.length; i++) {
      const templateKey = this.capitalize(templateList[i]);
      templatesObj[templateKey] = Handlebars.templates[templateList[i]];
    }

    return templatesObj;
  },

  templateList() {
    return Object.keys(Handlebars.templates);
  },

  postList() {
    const postNames = [];
    const templateList = this.templateList();

    for (let i = 0; i < templateList.length; i++) {
      if (templateList[i].search('_') !== -1) {
        postNames.push(templateList[i]);
      }
    }

    return postNames;
  },

  loadPosts(numberOfPosts, template) {
    const postList = this.postList();
    let postCount;

    if (postList.length > numberOfPosts) {
      postCount = numberOfPosts;
    } else {
      postCount = postList.length;
    }

    const postContent = [];

    for (let i = 0; i < postCount; i++) {
      const post = postList[i];
      postContent.push(template[post]());
    }

    return postContent;
  },
};
