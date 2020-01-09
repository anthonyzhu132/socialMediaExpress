const Post = require('../models/post')

exports.getPosts = (req, res) => {
  //Creating variable that finds all the posts, selects the ID, TITLE & BODY
  const posts = Post.find().select("_id title body")
  .then((posts) => {
    res.json({ posts })
    //reponds with all the posts in JSON format
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
      res.json({
        post: result
      })
    })
}