'use strict'

const expect = require('chai').expect;
const assert = require('chai').assert;
const Post = require('../javascripts/Post');
const Helpers = require('./helpers.js')

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
      let dateViewHelper = '{{publishedDateFor';

      expect(contents).to.include(title);
      expect(contents).to.include('mockPost');
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
           console.log(posts);
           let lastPost = posts[posts.length -1];

           expect(lastPost.name).to.equal(mockPost.name)
           done();
         } catch( e ) {
           done( e );
         }
       }).catch( (err) => {
         assert.fail(err)
         done();
       })

    });
  })

  xdescribe("#publishPost", function() {
    it('makes the published status true in postList.json', function() {
      let publishedPost = { name: '1469566234000_mockPost.md',
                        content: '',
                        date: '2016-07-26T20:50:34.000Z',
                        published: true,
                        categories: []
                      }
      expect().to.equal();
    });
  });



});
