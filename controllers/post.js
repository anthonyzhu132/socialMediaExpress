const Post = require('../models/post')
const formidable = require('formidable')
const fs = require('fs')

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