const { validationResult } = require('express-validator')
const bcrypt = require('bcrypt')
const pool = require('../db/index')
const saltRounds = 10
const jwt = require('jsonwebtoken')

const register = async (req, res) => {
  const errors = validationResult(req)
  if (!errors.isEmpty()) {
    return res.status(400).json({ errors: errors.array() })
  }

  try {
    const { fName, lName, email, password } = req.body
    const hashedPassword = await bcrypt.hash(password, saltRounds)
    const client = await pool.connect()
    try {
      const result = await client.query(
        'INSERT INTO users (fName, lName, email, password) VALUES ($1, $2, $3, $4) RETURNING id',
        [fName, lName, email, hashedPassword]
      )
      res.status(200).json({ message: 'Registration successful' })
    } catch (queryError) {
      if (queryError.code === '23505') {
        res.status(400).json({ message: 'Email already exists' })
      } else {
        console.error('Error executing query:', queryError)
        res.status(500).json({ message: 'Error executing query' })
      }
    } finally {
      client.release()
    }
  } catch (e) {
    console.error(e)
    res.status(500).json({ message: 'Internal Server Error' })
  }
}
let refreshTokens = []
const login = async (req, res) => {
  const errors = validationResult(req)
  if (!errors.isEmpty()) {
    return res.status(400).json({ errors: errors.array() })
  }

  try {
    const { email, password } = req.body
    const client = await pool.connect()
    try {
      const result = await client.query(
        'SELECT password FROM users WHERE email = $1',
        [email]
      )

      if (result.rows.length === 0) {
        return res.status(400).json({ message: 'Invalid email or password' })
      }
      const user = result.rows[0]
      const hashedPassword = user.password
      const isMatch = await bcrypt.compare(password, hashedPassword)

      if (!isMatch) {
        return res.status(400).json({ message: 'Invalid email or password' })
      }
      const accessToken = jwt.sign(
        { id: user.id, username: user.username },
        process.env.ACCESS_TOKEN_SECRET,
        { expiresIn: '1h' }
      )
      const refreshToken = jwt.sign(
        { id: user.id, username: user.username },
        process.env.REFRESH_TOKEN_SECRET,
        { expiresIn: '7d' }
      )
      refreshTokens.push(refreshToken)

      res.json({ accessToken, refreshToken })
      // res.status(200).send('Login successful')
    } finally {
      client.release()
    }
  } catch (e) {
    console.error(e)
    res.status(500).json({ message: 'Internal Server Error' })
  }
}
const token = (req, res) => {
  const { token } = req.body
  if (!token) return res.sendStatus(401)
  if (!refreshTokens.includes(token)) return res.sendStatus(403)

  jwt.verify(token, process.env.REFRESH_TOKEN_SECRET, (err, user) => {
    if (err) return res.sendStatus(403)
    const accessToken = jwt.sign(
      { id: user.id, username: user.username },
      process.env.ACCESS_TOKEN_SECRET,
      { expiresIn: '1h' }
    )
    res.json({ accessToken })
  })
}
module.exports = {
  register,
  login,
  token
}
