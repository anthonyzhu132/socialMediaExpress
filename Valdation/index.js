exports.createsPostValidator = (req, res, next) => {
  // title
  req.check('title', 'Write a title').notEmpty();
  req.check('title', 'Title must be between 4 to 150 characters').isLength({
      min: 4,
      max: 150
  });
  // body
  req.check('body', 'Write a body').notEmpty();
  req.check('body', 'Body must be between 4 to 2000 characters').isLength({
      min: 4,
      max: 2000
  });
  // check for errors
  const errors = req.validationErrors();
  // if error show the first one as they happen
  if (errors) {
      const firstError = errors.map(error => error.msg)[0];
      return res.status(400).json({ error: firstError });
  }
  // proceed to next middleware
  next();
;}


exports.userSignupValidator = (req, res, next) => {
    //Check to see if name is empty
    req.check('name', 'Name cannot be empty').notEmpty();
    //Check to see if email is valid
    req.check('email', 'Email must be between 3 to 32 characters')
    .matches(/.+\@.+\..+/)
    .withMessage('Email must contain @')
    .isLength({
        min: 4,
        max: 2000
    });
}