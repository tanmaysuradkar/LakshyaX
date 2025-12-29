const mongoose = require('mongoose');

const companySchema = new mongoose.Schema({
  name: {
    type: String,
    required: true,
    trim: true
  },
  industry: {
    type: String,
    required: true,
    trim: true
  },
  address: {
    type: String,
    trim: true
  },
  ceo: {
    type: mongoose.Schema.Types.ObjectId,
    required: true,
    ref: 'ceos'
  },
  phone: {
    type: String,
    trim: true
  },
  website: {
    type: String,
    trim: true
  },
  foundedDate: {
    type: Date
  },
  employeesNumber: {
    type: Number,
    default: 0
  },
  status: {
    type: String,
    enum: ['Active', 'Inactive', 'Closed'],
    default: 'Active'
  },
  logo: {
    type: String,
    trim: true
  }
}, { timestamps: true });

const Company = mongoose.models.Company || mongoose.model('Company', companySchema);

module.exports = Company;
