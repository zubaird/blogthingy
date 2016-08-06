'use strict'
const Post = require('../Post.js');

Post.all().then( posts => {
  posts.forEach(post => {
    console.log("File: ", post.name);
    console.log("Date: ", post.date);
    console.log("Published: ", post.published);
    console.log("- - - - - - - - - - - - - - - - - - -");
  })
}).catch( err => {
  console.error(err);
})
