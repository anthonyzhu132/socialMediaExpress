const express = require('express')
const { userById, allUsers } = require('../controllers/user')

const router = express.Router()

//adding a route to fetch all of the users
router.get('/users', allUsers);

// any routes containing :userId, app will execute userbyid()
router.param("userId", userById)

module.exports = router;