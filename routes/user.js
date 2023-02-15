const express = require('express')
const {
  handleSignUp,
  handleLogin,
  getAllUsers,
} = require('../controllers/user')
const router = express.Router()

router.get('/', getAllUsers)
router.post('/signup', handleSignUp)
router.post('/login', handleLogin)

module.exports = router
