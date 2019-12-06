exports.createsPostValidator = (req, res) => {
  //Checking Validation for title, checking for title not being empty and length meeting criteria
  req.check('title', "Title cannot be empty").notEmpty()
  req.check('title', "Title is either too short or too long").isLength({min: 4, max: 150});

  //Checking Validation for body, checking for body not being empty and length meeting criteria
  req.check('body', "Body cannot be empty").notEmpty()
  req.check('body', "Body is either too short or too long").isLength({min: 4, max: 2000});

  //Checking for errors in general
  const errors = req.ValidateErrors()

  //Show any errors as they happen first
  if(errors) {
    const firstError = errors.map((error) => error.msg)[0]
    return status(400).json({error: firstError})
  }

  //
};