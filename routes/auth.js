const express = require('express')
const { signup } = require('../controllers/auth')
const router = express.Router()
const { userSignupValidator } = require('../Valdation');

//Posting post information from frontend to backend
router.post('/signup', userSignupValidator, signup);

module.exports = router;