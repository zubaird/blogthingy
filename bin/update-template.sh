printf "var Handlebars = require('handlebars'); \n" > ./javascripts/templates/template.js
handlebars ./javascripts/templates -f >> ./javascripts/templates/template.js
ex -sc '2i|module.exports=' -cx ./javascripts/templates/template.js

browserify javascripts/main.js -o bundle.js
