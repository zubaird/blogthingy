node ./javascripts/commands/publishPost.js $1
printf "var Handlebars = require('handlebars'); \n" > ./javascripts/templates/posts.js
handlebars -e "html" ./posts/html -f >> ./javascripts/templates/posts.js
ex -sc '2i|module.exports=' -cx ./javascripts/templates/posts.js
