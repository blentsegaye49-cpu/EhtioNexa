const Jobseeker = require('../models/Jobseeker')
const Company = require('../models/Company')

const getDashboard = async (req, res) => {
  try {
    if (req.user.role === 'jobseeker') {
      const profile = await Jobseeker.findOne({ accountId: req.user._id }).lean()
      const matches = profile ? await Company.find({ WorkField: profile.Field }).select('-accountId').lean() : []
      return res.json({ role: req.user.role, profile, matches })
    }

    const profile = await Company.findOne({ accountId: req.user._id }).lean()
    const matches = profile ? await Jobseeker.find({ Field: profile.WorkField }).select('-accountId').lean() : []
    res.json({ role: req.user.role, profile, matches })
  } catch (error) {
    console.error('Dashboard error:', error)
    res.status(500).json({ message: 'Unable to load your dashboard.' })
  }
}

module.exports = { getDashboard }