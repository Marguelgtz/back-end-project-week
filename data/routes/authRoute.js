const express = require('express')
const router = express.Router()
const bcrypt = require('bcrypt')

const db = require('../helpers/authDb')
const userDb = require('../helpers/usersDb')
const {generateToken} = require('../middleware/authMd')

// endpoints
router.post('/register', (req, res) =>{
  const creds = req.body
  const hash = bcrypt.hashSync(creds.password, 12)
  creds.password = hash
  if(creds.username && creds.password) {
    db.register(creds)
      .then(ids => {
        const id = ids[0]
        userDb.getUser(id)
          .then(user => {
            const token = generateToken(user)
            res
              .status(201)
              .json({token})
          })
          .catch(() => {
            res
              .status(500)
              .json({message: 'Failed to Authenticate user'})
          })
      })
      .catch(() => {
        res
          .status(500)
          .json({message: 'Failed to register user'})
      })
  } else {
    res
      .status(404)
      .json({message: 'Missing username/password'})
  }
})

router.post('/login', (req, res) => {
  const creds = req.body
  if(creds.username && creds.password) {
    db.login(creds.username)
      .then(user => {
        if(user.password && bcrypt.compareSync(creds.password, user.password)) {
          const token = generateToken(user)
          res
            .status(201)
            .json({token})
        } else {
          res
            .status(403)
            .json({message: 'Failed to aunthenticate user'})
        }
      })
      .catch(() => {
        res
          .status(500)
          .json({message: 'Login failed'})
      })
  } else {
    res
      .status(404)
      .json({message: 'Missing username/password'})
  }
})

module.exports = router