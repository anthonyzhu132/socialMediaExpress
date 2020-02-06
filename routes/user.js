const express = require('express')
const { userById, allUsers, getuser } = require('../controllers/user')
const { requireSignin } = require('../controllers/auth')
const router = express.Router()

//adding a route to fetch all of the users
router.get('/users', allUsers);
router.get('/user/:userId', requireSignin, getuser);

// any routes containing :userId, app will execute userbyid()
router.param("userId", userById)

module.exports = router;