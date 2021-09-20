const mongoose = require('mongoose')
const bcrypt = require('bcryptjs')
const jwt = require('jsonwebtoken')

const userSchema = mongoose.Schema({
  name: {
    type: String,
    required: [true, 'Please include your name.']
  },
  email: {
    type: String,
    required: [true, 'Please include your email.']
  },
  password: {
    type: String,
    required: [true, 'Please include your password.']
  },
  iam_access_key: {
    type: String,
    required: [true, 'Something went wrong with IAM user creds.']
  },
  iam_secret_key: {
    type: String,
    required: [true, 'Something went wrong with IAM user creds.']
  },
  tokens: [
    {
      token: {
        type: String,
        required: true
      }
    }
  ]
})

// Hash password before saving User Model
userSchema.pre('save', async function(next) {
  const user = this
  if (user.isModified('password')) {
    user.password = await bcrypt.hash(user.password, 8)
  }
  next()
})

// Generates auth token for User
userSchema.methods.generateAuthToken = async function() {
  const user = this
  const token = jwt.sign({ _id: user._id, name: user.name, email: user.email, iam_access_key: user.iam_access_key, iam_secret_key: user.iam_secret_key },
  'secret'  )
  user.tokens = user.tokens.concat({ token })
  await user.save()
  return token
}

// Search for a user by email and password
userSchema.statics.findByCredentials = async (email, password) => {
  const user = await User.findOne({ email })
  if (!user) {
    throw new Error({ error: 'Invalid login details' })
  }
  const isPasswordMatch = await bcrypt.compare(password, user.password)
  if (!isPasswordMatch) {
    throw new Error({ error: 'Invalid login details' })
  }
  return user
}

const User = mongoose.model('User', userSchema)

module.exports = User