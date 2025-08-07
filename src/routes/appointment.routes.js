const express = require('express');
const router = express.Router();
const appointmentController = require('../controllers/appointment.controller.js');
const { authenticate } = require('../middleware/auth.middleware.js');

router.use(authenticate);
router.post('/', appointmentController.createAppointment);
router.get('/', appointmentController.getAppointments);

module.exports = router;
