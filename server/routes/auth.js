const express = require('express')
const { body } = require('express-validator')
const { register, login } = require('../controllers/authController')

const router = express.Router()

router.post(
  '/register',
  [
    body('email').isEmail().withMessage('Invalid email'),
    body('password').notEmpty().withMessage('Password is required')
  ],
  register
)

router.post(
  '/login',
  [
    body('email').isEmail().withMessage('Invalid email'),
    body('password').notEmpty().withMessage('Password is required')
  ],
  login
)

module.exports = router
