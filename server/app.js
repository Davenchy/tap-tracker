const express = require('express')
const bodyParser = require('body-parser')
const cors = require('cors')
const moragn = require('morgan')
const { sequelize } = require('./db')
const { port } = require('./config')

// setup express app
const app = express()
app.use(moragn('combined'))
app.use(bodyParser.json())
app.use(bodyParser.urlencoded({ extended: true }))
app.use(cors())

// allow cors [solution for development only]
app.use((req, res, next) => {
  res.setHeader('Access-Control-Allow-Origin', '*')
  res.setHeader('Access-Control-Allow-Headers', '*')
  next()
})

// routes
app.use(require('./routes/auth'))
app.use(require('./routes/taptracker'))

// connect the database and start the server
sequelize.sync().then(() => {
  console.log('connected to database')
  app.listen(port, () => console.log(`server is running on port ${port}`))
})
