printf "var Handlebars = require('handlebars'); \n" > ./javascripts/templates/posts.js
handlebars -e "md" ./posts -f >> ./javascripts/templates/posts.js
ex -sc '2i|module.exports=' -cx ./javascripts/templates/posts.js
