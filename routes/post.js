const express = require('express')
const postController = require('../controllers/post')
const router = express.Router()
const Validator = require('../Valdation');
//Loading root page and getting posts
router.get('/', postController.getPosts)

//Posting post information from frontend to backend
router.post('/post', Validator.createsPostValidator, postController.createPosts)

module.exports = router;