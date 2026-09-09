const User = require('../models/User')

const requireAuth = async (req, res, next) => {
  const authorization = req.headers.authorization || ''
  if (!authorization.startsWith('Bearer_')) {
    return res.status(401).json({ message: 'Please log in first.' })
  }

  try {
    const user = await User.findById(authorization.replace('Bearer_', ''))
    if (!user) return res.status(401).json({ message: 'Invalid login session.' })
    req.user = user
    next()
  } catch (error) {
    res.status(401).json({ message: 'Invalid login session.' })
  }
}

module.exports = requireAuth