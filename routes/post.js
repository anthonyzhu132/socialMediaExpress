const express = require('express')
const {getPosts, createPosts, postsByUser} = require('../controllers/post')
const router = express.Router()
const { requireSignin } = require('../controllers/auth')
const { createsPostValidator } = require('../Valdation');
const { userById } = require('../controllers/user')

//Loading root page and getting posts
router.get('/', getPosts)

//Posting post information from frontend to backend
router.post('/post/new/:userId', requireSignin, createPosts, createsPostValidator)

// any routes containing :userId, app will execute userbyid()
router.param("userId", userById)

router.get("/posts/by/:userId", requireSignin, postsByUser)

module.exports = router;