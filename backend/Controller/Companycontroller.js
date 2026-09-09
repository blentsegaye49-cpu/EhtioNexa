const Company = require('../models/Company')

const createCompany = async (req, res) => {
  try {
    const {
      CompanyName,
      Phonenumber,
      EmailAddress,
      Companylocation,
      Companytype,
      WorkField,
      Numberofemployees,
      Companydiscription
    } = req.body

    if (req.user && EmailAddress && EmailAddress.toLowerCase() !== req.user.email.toLowerCase()) {
      return res.status(400).json({ message: 'The email on this form must match the email you used to sign up.' })
    }

    const company = await Company.create({
      accountId: req.user ? req.user._id : undefined,
      CompanyName,
      Phonenumber,
      EmailAddress: req.user ? req.user.email : EmailAddress,
      Companylocation,
      Companytype,
      WorkField,
      Numberofemployees,
      Companydiscription
    })

    res.status(201).json(company)
  } catch (error) {
    if (error.code === 11000) {
      return res.status(409).json({ message: 'A company with this email already exists.' })
    }

    if (error.name === 'ValidationError') {
      return res.status(400).json({ message: 'Please provide all required company fields.', error: error.message })
    }

    console.error('Create company error:', error)
    res.status(500).json({ message: 'Unable to save company.' })
  }
}

const getCompanies = async (req, res) => {
  try {
    const companies = await Company.find().sort({ createdAt: -1 })
    res.status(200).json(companies)
  } catch (error) {
    console.error('Get companies error:', error)
    res.status(500).json({ message: 'Unable to load companies.' })
  }
}

const getCompanyProfile = async (req, res) => {
  const profile = await Company.findOne({ accountId: req.user._id })
  res.status(200).json(profile)
}

module.exports = { createCompany, getCompanies, getCompanyProfile }
