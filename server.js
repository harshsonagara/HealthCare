require('dotenv').config();
const app = require('./src/app.js');
const connectDB = require('./src/config/db.config.js');
const initSocket = require('./src/config/socket.config.js');
const { logger } = require('./src/middleware/logger.middleware.js');

// Database connection
connectDB();

// Start server
const PORT = process.env.PORT || 5000;
const server = app.listen(PORT, () => {
  logger.info(`Server running on port ${PORT}`);
});

// Initialize Socket.io
initSocket(server);

module.exports = server;
