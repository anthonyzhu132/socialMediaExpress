const User = require('../models/user');
require('dotenv').config()
const jwt = require('jsonwebtoken');

exports.signup = async (req, res) => {
  const userExists = await User.findOne({ email: req.body.email });
  if (userExists)
      return res.status(403).json({
          error: 'Email is taken!'
      });
  const user = await new User(req.body);
  await user.save();
  res.status(200).json({ message: `Signup success with name: ${user.name}, email: ${user.email}` });
};

exports.signin = (req, res) => {
  //Find the user based on the email they have provided
  const {email, password} = req.body
  User.findOne({email}, (err, user) => {
    if(err || !user ) {
      return res.status(401).json({
        error: "User with that email does not exist"
      })
    }

    //If user is found, authenticate user email and password
    //Authentication method in user models
  })
  // if there is no user, or an error

  //If there is a user, authenticate the user
}