exports.getPosts = (req, res) => {
  //Returning Information as Json format to the page instead of using re.send, which just sends blank text
  res.json({
    posts: [
      {title: "First"},
      {title: "Second"}
    ]
  });
};

