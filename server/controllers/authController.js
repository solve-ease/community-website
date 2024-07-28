const { validationResult } = require('express-validator')
const bcrypt = require('bcrypt')
const pool = require('../db/index')
const saltRounds = 10

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
      res.status(200).send('Registration successful')
    } catch (queryError) {
      if (queryError.code === '23505') {
        res.status(400).send('Email already exists')
      } else {
        console.error('Error executing query:', queryError)
        res.status(500).send('Error executing query')
      }
    } finally {
      client.release()
    }
  } catch (e) {
    console.error(e)
    res.status(500).send('Internal Server Error')
  }
}

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
        return res.status(400).send('Invalid email or password')
      }

      const hashedPassword = result.rows[0].password
      const isMatch = await bcrypt.compare(password, hashedPassword)

      if (!isMatch) {
        return res.status(400).send('Invalid email or password')
      }

      res.status(200).send('Login successful')
    } finally {
      client.release()
    }
  } catch (e) {
    console.error(e)
    res.status(500).send('Internal Server Error')
  }
}

module.exports = {
  register,
  login
}
