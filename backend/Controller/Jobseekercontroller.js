const Jobseeker = require('../models/Jobseeker')

const createJobseeker = async (req, res) => {
  try {
    const {
      FirstName,
      LastName,
      Gender,
      Phonenumber,
      EmailAddress,
      DateofBirth,
      City,
      Field,
      WorkExperience,
      UniversityCollege,
      GraduationYear,
      CV
    } = req.body

    if (req.user && EmailAddress && EmailAddress.toLowerCase() !== req.user.email.toLowerCase()) {
      return res.status(400).json({ message: 'The email on this form must match the email you used to sign up.' })
    }

    const jobseeker = await Jobseeker.create({
      accountId: req.user ? req.user._id : undefined,
      FirstName,
      LastName,
      Gender,
      Phonenumber,
      EmailAddress: req.user ? req.user.email : EmailAddress,
      DateofBirth,
      City,
      Field,
      WorkExperience,
      UniversityCollege,
      GraduationYear,
      CV
    })
    res.status(201).json(jobseeker)
  } catch (error) {
    if (error.code === 11000) {
      return res.status(409).json({ message: 'A jobseeker with this email already exists.' })
    }

    if (error.name === 'ValidationError') {
      return res.status(400).json({ message: 'Please provide all required jobseeker fields.', error: error.message })
    }

    console.error('Create jobseeker error:', error)
    res.status(500).json({ message: 'Unable to save jobseeker.' })
  }
}

const getJobseekers = async (req, res) => {
  try {
    const jobseekers = await Jobseeker.find().sort({ createdAt: -1 })
    res.status(200).json(jobseekers)
  } catch (error) {
    console.error('Get jobseekers error:', error)
    res.status(500).json({ message: 'Unable to load jobseekers.' })
  }
}

const getJobseekerProfile = async (req, res) => {
  const profile = await Jobseeker.findOne({ accountId: req.user._id })
  res.status(200).json(profile)
}

module.exports = { createJobseeker, getJobseekers, getJobseekerProfile }
