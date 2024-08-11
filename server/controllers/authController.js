const { validationResult } = require('express-validator')
const bcrypt = require('bcrypt')
const pool = require('../db/index')
const saltRounds = 10
const jwt = require('jsonwebtoken')

const { PrismaClient } = require('@prisma/client')
const prisma = new PrismaClient()

const register = async (req, res) => {
  const errors = validationResult(req)
  if (!errors.isEmpty()) {
    return res.status(400).json({ errors: errors.array() })
  }

  try {
    const { fName, lName, email, password } = req.body
    const hashedPassword = await bcrypt.hash(password, saltRounds)

    const user = await prisma.user.create({
      data: { fName, lName, email, password: hashedPassword }
    })

    res.status(200).json({ message: 'Registration successful', userId: user.id })
  } catch (error) {
    if (error.code === 'P2002') { // Unique constraint failed
      res.status(400).json({ message: 'Email already exists' })
    } else {
      console.error('Error registering user:', error)
      res.status(500).json({ message: 'Internal Server Error' })
    }
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

    const user = await prisma.user.findUnique({
      where: { email }
    })

    if (!user) {
      return res.status(400).json({ message: 'Invalid email or password' })
    }

    const isMatch = await bcrypt.compare(password, user.password)

    if (!isMatch) {
      return res.status(400).json({ message: 'Invalid email or password' })
    }

    const accessToken = jwt.sign(
      { id: user.id, username: user.email },
      process.env.ACCESS_TOKEN_SECRET,
      { expiresIn: '1h' }
    )
    const refreshToken = jwt.sign(
      { id: user.id, username: user.email },
      process.env.REFRESH_TOKEN_SECRET,
      { expiresIn: '7d' }
    )
    refreshTokens.push(refreshToken)

    res.json({ accessToken, refreshToken })
  } catch (error) {
    console.error('Error logging in:', error)
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
