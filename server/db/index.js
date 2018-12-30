const fs = require('fs')
const path = require('path')
const config = require('../config')
const Sequelize = require('sequelize')
const db = {}

// connect to db
const sequelize = new Sequelize(
  config.db.database,
  config.db.user,
  config.db.password,
  config.db.options
)

// import all models
fs.readdirSync(__dirname)
  .filter(file => file !== 'index.js')
  .forEach(file => {
    const model = sequelize.import(path.join(__dirname, file))
    db[model.name] = model
  })

// import the cores to db object
db.sequelize = sequelize
db.Sequelize = Sequelize

// export db object
module.exports = db
