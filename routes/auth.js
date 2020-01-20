const express = require('express')
const { signup, signin, signout } = require('../controllers/auth')
const router = express.Router()
const { userSignupValidator } = require('../Valdation');

//Posting post information from frontend to backend
router.post('/signup', userSignupValidator, signup);
router.post('/signin', signin);
router.get('/signout', signout)

module.exports = router;