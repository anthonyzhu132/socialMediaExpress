exports.createsPostValidator = (req, res) => {
  //Checking Validation for title, checking for title not being empty and length meeting criteria
  req.check('title', "Title cannot be empty").notEmpty()
  req.check('title', "Title is either too short or too long").isLength({min: 4, max: 150});
}