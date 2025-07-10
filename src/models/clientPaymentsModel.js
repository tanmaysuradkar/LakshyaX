const mongoose = require('mongoose');

const clientPaymentSchema = new mongoose.Schema({
  clientName: {
    type: String,
    required: true,
    trim: true
  },
  clientEmail: {
    type: String,
    required: true,
    trim: true,
    lowercase: true
  },
  amount: {
    type: Number,
    required: true,
    min: 0
  },
  currency: {
    type: String,
    default: 'INR', // or 'USD', 'EUR' etc.
    uppercase: true
  },
  paymentDate: {
    type: Date,
    default: Date.now
  },
  status: {
    type: String,
    enum: ['Pending', 'Completed', 'Failed', 'Refunded'],
    default: 'Pending'
  },
  paymentMethod: {
    type: String,
    enum: ['Card', 'Bank Transfer', 'UPI', 'Cash', 'Other'],
    default: 'Other'
  },
  notes: {
    type: String,
    trim: true
  }
}, { timestamps: true });

const ClientPayment = mongoose.model('ClientPayment', clientPaymentSchema);

module.exports = ClientPayment;
