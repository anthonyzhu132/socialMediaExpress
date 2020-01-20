const express = require('express')
const {getPosts, createPosts} = require('../controllers/post')
const router = express.Router()
const { requireSignin } = require('../controllers/auth')
const { createsPostValidator } = require('../Valdation');

//Loading root page and getting posts
router.get('/', requireSignin, getPosts)

//Posting post information from frontend to backend
router.post('/post', createsPostValidator, createPosts)

module.exports = router;