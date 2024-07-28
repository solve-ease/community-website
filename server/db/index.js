const { Pool } = require('pg')

const pool = new Pool({
  user: process.env.PSQLUSER,
  host: process.env.PSQLHOST,
  database: process.env.PSQLDATABASE,
  password: process.env.PSQLPASSWORD,
  port: process.env.PSQLPORT
})

module.exports = pool
