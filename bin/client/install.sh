node /usr/local/lib/node_modules/blingy/javascripts/commands/init.js
cp -r /usr/local/lib/node_modules/blingy/javascripts .
cp /usr/local/lib/node_modules/blingy/bundle.js bundle.js
cp /usr/local/lib/node_modules/blingy/README.md README.md
cp /usr/local/lib/node_modules/blingy/index.html index.html
mkdir -pv posts/html
mkdir css
echo "you may need to run 'npm install handlebars'"
echo "you may need to run 'npm install markdown"
