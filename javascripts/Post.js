'use strict'

const fs = require('fs');
const path = require('path');

const PostMethods = {

  stampedName: function(postName,stamp) {
    return stamp + "_" + postName + ".md"
  },

  makeTimestamp: function() {
    return Date.parse( new Date() )
  },

  fullPath: function(path, stampedName) {
    return path + stampedName;
  },

  writeToPostsList: function(thisFile,stampedName, stamp) {
    return new Promise( (resolve, reject) => {
      fs.readFile(thisFile,'utf8',function(err,data){
        let postsData = JSON.parse(data);

        postsData.posts.push({
          name: stampedName,
          content: "",
          date: new Date(stamp),
          published: false,
          categories: []
        });

        let writableData = JSON.stringify(postsData);

        fs.writeFile(thisFile, writableData, function(err){
          if (err) {
            throw err;
          }
          resolve();
        })
      })
    })
  },

  removeTimestampAndType: function (name) {
    const NAMEMATCH = /_([^\.]+)/
    let matches = name.split(NAMEMATCH);;
    return matches[1]
  },

  findPostFromList: function(name,list,cb) {
    for (var i = 0; i < list.length; i++) {
      let postFromList = PostMethods.removeTimestampAndType(list[i].name);
      if ( name === postFromList ) {
        cb(list[i], i)
      }
    }
  },

  handleError: function(err) {
    if (err) {
      throw err;
    }
  },

  removeFromJSON: function(name) {
    return new Promise( (resolve, reject) => {
      let file = './postsList.json'

      fs.readFile(file,'utf8',function(err,data){
        let postsList = JSON.parse(data);
        let posts = postsList.posts;
        let updatedContent;

        PostMethods.findPostFromList(name,posts,function(post,index){
          console.log(post);
          posts.splice(index,1);
          updatedContent = JSON.stringify(postsList)

          fs.writeFile(file,updatedContent,function(err){
            if (err) {
              console.error('line 82 error Post.js',err);
              reject(err)
            }
            resolve();
          });
        })
      })
    })
  },

  deleteMDFile: function(name, cb){
    return new Promise( (resolve, reject) => {
      let file = './postsList.json'

      fs.readFile(file,'utf8',function(err,data){
        let postsList = JSON.parse(data);
        let posts = postsList.posts;
        let path;

        PostMethods.findPostFromList(name,posts,function(post,index){
          path = './posts/' + post.name
          fs.unlink(path,function(err){
            if (err) {
              console.error(err);
              reject(err);
            }
            resolve();
          })
        })

      })
    })
  },
}

const Post  = {
  newDraft: function(draftName) {
    return new Promise((resolve,reject) => {
      let content = "# Title \n*Published on: {{publishedDateFor '" + draftName + "'}}*\n",
          stamp = PostMethods.makeTimestamp(),
          stampedName = PostMethods.stampedName(draftName,stamp),
          fullPath = PostMethods.fullPath('./posts/', stampedName)

      fs.writeFile(fullPath, content, (err) => {
        PostMethods.writeToPostsList('./postsList.json', stampedName, stamp).then( () => {
          resolve(err);
        })
      });

    })
  },

  remove: function(postName) {
    let stepOne = PostMethods.removeFromJSON(postName);
    let stepTwo = PostMethods.deleteMDFile(postName);
    return Promise.all([stepOne,stepTwo]);
  },

  find: function(postName) {
    return new Promise( (resolve,reject)=> {
      let foundPost;

      fs.readFile('./postsList.json','utf8', (err,data) => {
        let posts = JSON.parse(data).posts;

        PostMethods.findPostFromList(postName, posts, (post,index) => {
          resolve(post);
        });

      })
    })
  },

  all: function() {
    return new Promise( (resolve, reject) => {
      fs.readFile('./postsList.json','utf8', (err,data) => {
        let posts = JSON.parse(data).posts;
        resolve(posts);
      })
    })
  }

}

module.exports = Post;
