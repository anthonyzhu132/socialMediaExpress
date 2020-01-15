const express = require('express')
const { signup, signin } = require('../controllers/auth')
const router = express.Router()
const { userSignupValidator } = require('../Valdation');

//Posting post information from frontend to backend
router.post('/signup', userSignupValidator, signup);
router.post('/signin', signin);

module.exports = router;