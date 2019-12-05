const express = require('express')
const postController = require('../controllers/post')
const router = express.Router()

//Loading root page and getting posts
router.get('/', postController.getPosts)

//Posting post information from frontend to backend
router.post('/post', postController.createPosts)

module.exports = router;