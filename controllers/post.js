const Post = require('../models/post')
const formidable = require('formidable')
const fs = require('fs')


exports.postById = (req, res, next, id) => {
  Post.findById(id)
  .populate("postedBy", "_id name")
  .exec((err, post) => {
    if(err || !post) {
      return res.statu(400).json({error: err})
    }
    req.post = post
    next()
  })
}

exports.getPosts = (req, res) => {
  //Creating variable that finds all the posts, selects the ID, TITLE & BODY
  const posts = Post.find()
  .populate("postedBy", "_id name")
  .select("_id title body")
  .then((posts) => {
    res.json({ posts })
    //reponds with all the posts in JSON format
  })
  .catch(err => console.log(err)); 
};

//Creating the post after receiving information from the frontend
exports.createPosts = (req, res, next) => {
  let form = new formidable.IncomingForm()
  form.keepExtensions = true;
  form.parse(req, (err, fields, files) => {
    if(err) {
      return res.status(400).json({
        error: "Could not process request"
      })
    }
    let post = new Post(fields);

    req.profile.hashed_password = undefined;
    req.profile.salt = undefined;
    post.postedBy = req.profile;

    if(files.photo) {
      post.photo.data = fs.readFileSync(files.photo.path)
      post.photo.contentType = files.photo.type
    }

    post.save((err, result) => {
      if(err) {
        return res.status(400).json({
          error: err
        })
      }
      res.json(result)
    })
  })
};

exports.postsByUser = (req, res) => {
  console.log(Post.find())
  Post.find({postedBy: req.profile._id})
    .populate("postedBy", "_id name")
    .sort("_created")
    .exec((err, posts) => {
      if(err) {
        return res.status(400).json({error: err})
      }
      res.json({posts})
    })
}

exports.isPoster = (req, res, next) => {
   let sameUser = req.profile && req.auth && req.profile.toString() === req.auth.toString();

  let isPoster = sameUser;

  if (!isPoster) {
      return res.status(403).json({
          error: 'User is not authorized'
      });
  }
  next();
};

exports.deletePost = (req, res) => {
  let post = req.posts;
  console.log(req.post)
  post.remove((err, post) => {
      if (err) {
          return res.status(400).json({
              error: err
          });
      }
      res.json({
          message: 'Post deleted successfully'
      });
  });
};