require('dotenv').config({ path: 'src/.env' }) 
const jwt = require('jsonwebtoken')

module.exports = async (req, res, next) => {
  try {
    const token = req.headers.authorization.replace('Bearer ', '')
    const decoded = jwt.verify(token, 'secret')

    req.userData = decoded
    
    next()
  } catch (err) {
    return res.status(401).json({
      message: 'Authentification Failed'
    })
  }
}