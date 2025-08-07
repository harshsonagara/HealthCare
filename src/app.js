const express = require('express');
const cookieParser = require('cookie-parser');

// Middleware Imports
const { requestLogger, morganLogger} = require('./middleware/logger.middleware');
const { authenticate } = require('./middleware/auth.middleware');
const securityMiddleware = require('./middleware/security.middleware'); 

// Route Imports
const authRoutes = require('./routes/auth.routes');
const appointmentRoutes = require('./routes/appointment.routes');
const adminRoutes = require('./routes/admin.routes');
const chatRoutes = require('./routes/chat.routes');

const app = express();

// ======================
// SECURITY MIDDLEWARE
// ======================
securityMiddleware(app); // Apply security middleware globally

// ======================
// CORE MIDDLEWARE
// ======================
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(morganLogger);     // For HTTP detailed logs
app.use(requestLogger);    // Optional: Basic log like "GET /something"


// ======================
// ROUTES
// ======================
app.use('/api/auth', authRoutes);
app.use('/api/appointments', authenticate, appointmentRoutes);
app.use('/api/admin', authenticate, adminRoutes);
app.use('/api/chat', authenticate, chatRoutes);

// ======================
// ERROR HANDLING
// ======================
// 404 Handler
app.use((req, res, next) => {
    res.status(404).json({ success: false, message: 'Resource not found' });
});

// Final error handler
app.use(require('./middleware/error.middleware'));

module.exports = app;
