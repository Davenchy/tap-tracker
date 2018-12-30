const router = require('express').Router()
const jwt = require('jsonwebtoken')
const bcrypt = require('bcryptjs')
const { User } = require('../db')
const { login, register, authed } = require('../utils/auth')
const { jwtSecret } = require('../config')

router.post('/register', register, async (req, res) => {
  const { username, email, password } = req.body

  try {
    const user = await User.create({
      username, email, password: bcrypt.hashSync(password, 10)
    })
    res.send({
      msg: `account was created`,
      user: user.toJSON()
    })
  } catch (err) {
    res.status(400).send({
      error: `this email account ${email} is already in use`
    })
  }
})

router.post('/login', login, async (req, res) => {
  const { email, password } = req.body

  const user = await User.findOne({
    where: {
      email
    }
  })

  if (!user) return res.status(403).send({ error: `user with the email ${email} was not found` })

  const isPasswordValid = bcrypt.compareSync(password, user.password)

  if (!isPasswordValid) return res.status(403).send({ error: `incorrect password` })

  try {
    const token = jwt.sign({
      id: user.id
    }, jwtSecret, { expiresIn: 60 * 60 * 24 * 7 })

    res.send({
      msg: `welcome, ${user.username}`,
      user: user.toJSON(),
      token
    })
  } catch (_) {
    res.status(500).send({ error: 'server error' })
  }
})

router.post('/test', authed, (req, res) => {
  res.send({ msg: 'done!' })
})

module.exports = router
