const Appointment = require('../models/appointment.model.js');

exports.createAppointment = async (req, res, next) => {
  try {
    const { date, service } = req.body;
    const appointment = await Appointment.create({
      user: req.userId,
      date,
      service
    });

    res.status(201).json(appointment);
  } catch (err) {
    next(err);
  }
};

exports.getAppointments = async (req, res, next) => {
  try {
    const appointments = await Appointment.find({ user: req.userId });
    res.status(200).json(appointments);
  } catch (err) {
    next(err);
  }
};
