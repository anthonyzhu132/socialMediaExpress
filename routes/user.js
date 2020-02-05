const express = require('express')
const { userById } = require('../controllers/user')

const router = express.Router()

//Posting post information from frontend to backend
router.post('/signup', userSignupValidator, signup);
router.post('/signin', signin);
router.get('/signout', signout)

// any routes containing :userId, app will execute userbyid()
router.param("userId", userById)

module.exports = router;