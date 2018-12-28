const express = require('express')
const bodyParser = require('body-parser')
const cors = require('cors')
const moragn = require('morgan')
const { port } = require('./config')

const app = express()
app.use(moragn('combined'))
app.use(cors())
app.use(bodyParser.json())
app.use(bodyParser.urlencoded({ extended: false }))

app.listen(port, () => console.log(`server is running on port ${port}`))
