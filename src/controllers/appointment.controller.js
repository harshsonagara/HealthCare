const Appointment = require('../models/appointment.model.js');
const User = require('../models/user.model.js')
// Create a new appointment
async function createAppointment(req, res, next) {
  try {
    const { date, service } = req.body;

    if (!date || !service) {
      return res.status(400).json({
        success: false,
        message: 'Date and service are required.',
      });
    }

    const appointment = await Appointment.create({
      user: req.userId,
      date,
      service,
    });

    res.status(201).json({
      success: true,
      message: 'Appointment booked successfully.',
      data: appointment,
    });
  } catch (err) {
    next(err);
  }
}

// Get appointments - user sees own, admin sees all
async function getAppointments(req, res, next) {
  try {
    const filter = req.role === 'admin' ? {} : { user: req.userId };

    const appointments = await Appointment.find(filter)
      .sort({ date: 1 })
      .populate('user', 'name email'); 

    res.status(200).json({
      success: true,
      count: appointments.length,
      data: appointments,
    });
  } catch (err) {
    next(err);
  }
}

  module.exports = {
    createAppointment,
    getAppointments,
  };
