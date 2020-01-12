const express = require('express')
const { signup } = require('../controllers/auth')
const router = express.Router()
// const Validator = require('../Valdation');

//Posting post information from frontend to backend
router.post('/signup', signup)

module.exports = router;