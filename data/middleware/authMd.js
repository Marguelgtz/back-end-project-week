require('dotenv').config()
const jwt = require('jsonwebtoken')
const jwtKey = process.env.JWT_SECRET

module.exports = {
  generateToken: (user) => {
    const payload = {
      username: user.username,
      active: user.active,
    }
    const secret = jwtKey;
    const options = {
      expiresIn: '7d', // 7 days
    }
    return jwt.sign(payload, secret, options)
  },

  authProtect: (req, res, next) => {
    const token = req.get('Authorization');
    if(token) {
      jwt.verify(token, jwtKey, (err, decodedToken)  => {
        if(err) {
          res
            .status(403)
            .json({message: 'Invalid Token'})
        } else {
          req.tokenData = decodedToken;
          next()
        }
      })
    } else {
      res
        .status(401)
        .json({message: 'No token provided'})
    }
  }
}