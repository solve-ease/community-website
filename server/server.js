require('dotenv').config()
const express = require('express')
const cors = require('cors')

const app = express()
app.use(express.json())

app.use(
  cors({
    origin: '*',
  })
)

const PORT = process.env.PORT || 5000

const authRoutes = require('./routes/auth')
app.use('/api', authRoutes)

app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`)
})
