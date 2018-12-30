const joi = require('joi')

module.exports = {
  login (req, res, next) {
    joi.validate(req.body, {
      email: joi.string().email(),
      password: joi.string().regex(new RegExp('^[a-zA-Z0-9]{8,32}$'))
    }, (err, value) => {
      if (!err) return next()

      var msg = 'invalid data'

      switch (err.details[0].context.key) {
        case 'email':
          msg = err.details[0].message
          break
        case 'password':
          msg = 'password length must be in range of 8 to 32 characters, letters and numbers only'
          break
        default:
          break
      }

      res.status(400).send({ error: msg })
    })
  },
  register (req, res, next) {
    joi.validate(req.body, {
      username: joi.string().regex(/^[a-zA-Z0-9]{3,20}/),
      email: joi.string().email(),
      password: joi.string().regex(/^[a-zA-Z0-9]{8,32}$/)
    }, (err, value) => {
      if (!err) return next()

      var msg = 'invalid data'

      switch (err.details[0].context.key) {
        case 'username':
          msg = 'username length must be in range of 3 to 20, letters and numbers only'
          break
        case 'email':
          msg = err.details[0].message
          break
        case 'password':
          msg = 'password length must be in range of 8 to 32, letters and numbers only'
          break
        default:
          break
      }

      res.status(400).send({ error: msg })
    })
  },
  authed (req, res, next) {
    next()
  }
}
