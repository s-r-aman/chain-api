const knex = require('knex')

require('dotenv').config({ path: '.env' })

const db = knex({
  client: 'pg',
  connection: {
    host: process.env.DB_PORT,
    user: process.env.DB_USER,
    password: process.env.DB_PASSWORD,
    database: process.env.DB_NAME
  }
})

module.exports = db
