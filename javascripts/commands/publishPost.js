'use strict'

const Post = require('../Post.js');
var postName = process.argv[2];

Post.addToPostsList(postName).then( (file)=> {
  Post.toHTML(postName).then( (html)=> {
    console.log('Post compiled to HTML');
  }).catch( (err)=> {
    console.error(err);
  })
})
