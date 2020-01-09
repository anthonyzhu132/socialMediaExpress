const Post = require('../models/post')

exports.getPosts = (req, res) => {
  const posts = Post.find()
  .then((posts) => {
    res.status(200).json({posts: posts})
  })
  .catch(err => console.log(err)); 
};

//Creating the post after receiving information from the frontend
exports.createPosts = (req, res) => {
  //assigning a new post to const post, using the request's body information
  const post = new Post(req.body)

  //saving the post
  post.save()
    .then(result => {
      res.status(200).json({
        post: result
      })
    })
}