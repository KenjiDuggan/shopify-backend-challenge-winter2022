require('dotenv').config({ path: 'src/.env' }) 
const User = require('../models/User')
// const { createRole } = require('../services/iam')

exports.registerNewUser = async (req, res) => {
  try {
      let isUser = await User.find({ email: req.body.email })
      if(isUser.length >= 1) {
          return res.status(409).json({
              message: 'email already in use'
          })
      }
      let access_key, secret_key = ''

      // IAM roles programatically is giving me trouble so I split them into admin and user creds like this for now
      if(req.body.email == 'kenjiduggan@gmail.com') {
        access_key = process.env.ADMIN_AWS_ACCESS_KEY,
        secret_key = process.env.ADMIN_AWS_SECRET_KEY
      } else {
        access_key = process.env.USER_AWS_ACCESS_KEY,
        secret_key = process.env.USER_AWS_SECRET_KEY
      }
 
      const user = new User({
          name: req.body.name,
          email: req.body.email,
          password: req.body.password,
          iam_access_key: access_key,
          iam_secret_key: secret_key
      })

      const data = await user.save()
      const token = await user.generateAuthToken() // here it is calling the method that we created in the model
      
      // const response = await createRole(req.body.name.toLowerCase().trim())
    
      res.status(201).json({ data, token })
  } catch (err) {
      res.status(400).json({ err: err })
  }
}

exports.loginUser = async (req, res) => {
  try {
    const email = req.body.email
    const password = req.body.password
    const user = await User.findByCredentials(email, password)
    if (!user) {
      return res.status(401).json({ error: 'Login failed! Check authentication credentials' })
    }
 
    const token = await user.generateAuthToken()
    res.status(200).json({ user, token })
  } catch (err) {
    res.status(400).json({ err: err })
  }
}

exports.getUserDetails = async (req, res) => {
  // await createRole(req.userData.name.toLowerCase().trim())
  const userObj = {
    user: req.userData
  }

  await res.json(userObj)
}
