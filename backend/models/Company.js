const mongoose = require('mongoose');

const CompanySchema = new mongoose.Schema({
  accountId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User',
    unique: true,
    sparse: true
  },
  CompanyName: {
    type: String,
    required: true,
    trim: true
  },
  Phonenumber: {
    type: String,
    required: true,
    trim: true
  },
  EmailAddress: {
    type: String,
    required: true,
    unique: true,
    trim: true,
    lowercase: true
  },
  Companylocation: {
    type: String,
    required: true,
    trim: true
  },
  Companytype: {
    type: String,
    required: true,
    trim: true
  },
  WorkField: {
    type: String,
    required: true,
    trim: true
  },
  Numberofemployees: {
    type: String,
    required: true,
    trim: true
  },
  Companydiscription: {
    type: String,
    required: true,
    trim: true
  }
}, { timestamps: true });

module.exports = mongoose.model('Company', CompanySchema);
