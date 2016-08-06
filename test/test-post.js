'use strict'

const expect = require('chai').expect;
const assert = require('chai').assert;
const Post = require('../javascripts/Post');
const Helpers = require('./helpers.js');
const fs = require('fs');

describe('Post', function() {

  let contents;
  let err = false;
  let mockPost;

  before( done => {
     Post.newDraft('mockPost').then( (err) => {
       Post.find('mockPost').then(function(post) {
         mockPost = post;
         let fileName = "./posts/" + post.name

         Helpers.readFile(fileName).then( data => {
           contents = data;
           done();
         }).catch( data => {
           err = true;
           done();
         })
       })
     });
  })

  after(function(done) {
    if(!err) {
      Post.remove('mockPost').then( () => {
        done();
      });
    } else {
      console.error('Line 37 error',err);
      done();
    }
  });

  describe('new Post', () => {
    it('should create a md file', function() {
      expect(contents).to.include("");
    });

    it('should have starting content', function() {
      let title = "# Title";
      let dateViewHelper = '{{date}}';

      expect(contents).to.include(title);
      expect(contents).to.include(dateViewHelper);
    });
  });

  describe('#all', () => {
    it('should include the latest post', function(done) {
      let newPost =  { name: '1470101509000_mockPost.md',
                        content: '',
                        date: '2016-08-02T01:31:49.000Z',
                        published: false,
                        categories: []
                    }

      Post.all().then( (posts) => {
         try {
           let lastPost = posts[posts.length -1];
           expect(lastPost.name).to.equal(mockPost.name)
           done();
         } catch(err) {
           done(e);
         }
       }).catch( (err) => {
         assert.fail(err)
         done();
       })

    });
  })

  describe("#addToPostsList", function() {
    it('makes the published status true in postList.json', function(done) {
      Post.addToPostsList('mockPost').then( (published)=> {
        try {
          expect(published).to.not.equal(false);
          done();
        } catch (err) {
          done(err)
        }
      })

    });
  });

  describe("#toHTML", function() {
    it('turns a MD post to HTMl', function(done) {
      Post.toHTML('mockPost').then( (html)=> {
        try {
          expect(html).to.include('<h1>');
          done();
        } catch (err) {
          done(err)
        }
      })
    });
  });

  describe("#unpublish", function() {
    it('deletes the HTML and sets published to false', function(done) {
      let normalizedName = mockPost.name.slice(0,mockPost.name.length-3)
      Post.unpublish('mockPost').then( (content)=> {
        try {
          fs.readFile(`./posts/html/${normalizedName}.html`,'utf8', (err, data)=> {
            expect(JSON.parse(content).posts[0].published).to.equal(false);
            expect(data).to.equal(undefined);
            expect(err.errno).to.equal(-2);
            done();
          })
        } catch (err) {
          done(err)
        }
      })
    });
  });


});
