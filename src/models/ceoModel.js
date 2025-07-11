const mongoose = require('mongoose');

const ceoSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true,
    trim: true
  },
  email: {
    type: String,
    required: true,
    unique: true,
    lowercase: true,
    trim: true
  },
  img: {
    type: String, // URL or file path to CEO’s photo
    trim: true
  },
  companyType: {
    type: String,
    trim: true
  },
  joinedDate: {
    type: Date,
    default: Date.now
  },
  status: {
    type: String,
    enum: ['Active', 'Retired', 'On Leave'],
    default: 'Active'
  }
}, { timestamps: true });

const CEO = mongoose.model('CEO', ceoSchema);

module.exports = CEO;
