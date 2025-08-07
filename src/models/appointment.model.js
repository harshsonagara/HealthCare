const mongoose = require('mongoose');

const appointmentSchema = new mongoose.Schema({
  user: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User',
    required: true
  },
  date: {
    type: Date,
    required: [true, 'Appointment date is required'],
    validate: {
      validator: (value) => value > new Date(),
      message: 'Appointment date must be in the future'
    }
  },
  service: {
    type: String,
    required: [true, 'Service type is required'],
    trim: true,
    maxlength: 100
  },
  status: {
    type: String,
    enum: ['pending', 'confirmed', 'cancelled'],
    default: 'pending'
  }
}, {
  timestamps: true
});

module.exports = mongoose.model('Appointment', appointmentSchema);
