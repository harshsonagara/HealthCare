const nodemailer = require('nodemailer');

const transporter = nodemailer.createTransport({
  service: 'Gmail',
  auth: {
    user: process.env.SMTP_USER,
    pass: process.env.SMTP_PASS
  }
});

exports.sendAppointmentEmail = async (toEmail, appointmentDate) => {
  await transporter.sendMail({
    from: '"Clinic" <no-reply@clinic.com>',
    to: toEmail,
    subject: 'Appointment Confirmed',
    html: `<p>Your appointment is scheduled for ${appointmentDate}</p>`
  });
};
