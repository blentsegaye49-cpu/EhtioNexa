const crypto = require('crypto')
const User = require('../models/User')

const hashPassword = (password) => crypto.createHash('sha256').update(password).digest('hex')

const userResponse = (user) => ({
  id: user._id,
  username: user.username,
  email: user.email,
  role: user.role,
  token: `Bearer_${user._id}`
})

const register = async (req, res) => {
  try {
    const { username, email, password, role } = req.body

    if (!username || !email || !password || !role) {
      return res.status(400).json({ message: 'Username, email, password, and account type are required.' })
    }

    if (!['jobseeker', 'company'].includes(role)) {
      return res.status(400).json({ message: 'Choose either Jobseeker or Company.' })
    }

    const existingUser = await User.findOne({ $or: [{ email: email.toLowerCase() }, { username }] })
    if (existingUser) {
      return res.status(409).json({ message: 'Username or email is already registered.' })
    }

    const user = await User.create({ username, email: email.toLowerCase(), passwordHash: hashPassword(password), role })
    res.status(201).json({ message: 'Account created successfully.', user: userResponse(user) })
  } catch (error) {
    console.error('Register error:', error)
    res.status(500).json({ message: 'Unable to create account.' })
  }
}

const login = async (req, res) => {
  try {
    const { username, password } = req.body
    const user = await User.findOne({ username: username && username.trim() })

    if (!user || user.passwordHash !== hashPassword(password || '')) {
      return res.status(401).json({ message: 'Username or password is incorrect.' })
    }

    res.status(200).json({ message: 'Login successful.', user: userResponse(user) })
  } catch (error) {
    console.error('Login error:', error)
    res.status(500).json({ message: 'Unable to log in.' })
  }
}

module.exports = { register, login }
