var fs = require('fs');

var name = process.argv[2];

function generateMarkdownPostNamed(postName, path) {
  return path + Date.parse( new Date() ) + "_" + postName + ".md";
}

var content = '# Title';

fs.writeFile(generateMarkdownPostNamed(name, './posts/'), content);
