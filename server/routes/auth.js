const express = require('express')
const { body } = require('express-validator')
const { register, login, token } = require('../controllers/authController')

const router = express.Router()


// root
app.get('/', (req, res) => {
  res.send('Welome to Solve-Ease Backend!');
});

// health-check
app.get('/health-check', (req, res) => {
  res.status(500).json({ message: 'Status : OK' })

});


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
router.post('/token', token)

module.exports = router
