require('dotenv').config()
const jwt = require('jsonwebtoken')

module.exports = {
  generateToken: (user) => {
    const payload = {
      username: user.username,
    }
    const secret = process.env.JWT_SECRET;
    const options = {
      expiresIn: '7d', // 7 days
    }
    return jwt.sign(payload, secret, options)
  }
}