var Handlebars = require('handlebars');

module.exports = {

  loadDomWith: function(query, template,templateData) {
    document.querySelectorAll(query)[0].innerHTML = template(templateData);
  },

  capitalize: function(word) {
    return word[0].toUpperCase() + word.slice(1,word.length);
  },

  load: function(templateList) {
    var templatesObj = {};
    console.log( templateList[1] );
    console.log( this.capitalize(templateList[1]) );

    for (var i = 0; i < templateList.length; i++) {
      templatesObj[ this.capitalize( templateList[i] ) ] = Handlebars.templates[ templateList[i] ];
    }

    return templatesObj;
  }
}
