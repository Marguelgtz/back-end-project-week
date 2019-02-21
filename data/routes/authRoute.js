const express = require('express')
const router = express.Router()
const bcrypt = require('bcrypt')

const db = require('../helpers/authDb')
const userDb = require('../helpers/usersDb')

// edpoints
router.post('/register', (req, res) =>{
  const creds = req.body
  const hash = bcrypt.hashSync(creds.password, 12)
  creds.password = hash;
  if(creds.username && creds.password) {
    db.register(creds)
      .then(ids => {
        const id = ids[0]
        userDb.getUser(id)
          .then(user => {
            // generate jwt through auth middleware
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

module.exports = router