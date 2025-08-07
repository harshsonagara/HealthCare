const express = require('express');
const router = express.Router();
const { createAppointment, getAppointments } = require('../controllers/appointment.controller.js');
const { authenticate } = require('../middleware/auth.middleware.js');

router.use(authenticate);
router.post('/', createAppointment);
router.get('/', getAppointments);

module.exports = router;
