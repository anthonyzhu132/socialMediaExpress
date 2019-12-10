const Post = require('../models/post')

exports.getPosts = (req, res) => {
  //Returning Information as Json format to the page instead of using re.send, which just sends blank text
  res.json({
    posts: [
      {title: "First"},
      {title: "Second"}
    ]
  });
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