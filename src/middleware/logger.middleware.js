const winston = require('winston');
const morgan = require('morgan');
const fs = require('fs');
const path = require('path');

// Create logs directory if not exists
const logDir = 'logs';
if (!fs.existsSync(logDir)) {
  fs.mkdirSync(logDir);
}

// Define colors for each log level
const colors = {
  error: 'red',
  warn: 'yellow',
  info: 'blue',
  http: 'magenta',
  debug: 'white',
};
winston.addColors(colors);

// Define the console log format with color
const consoleFormat = winston.format.combine(
  winston.format.colorize({ all: true }),
  winston.format.timestamp({ format: 'YYYY-MM-DD HH:mm:ss' }),
  winston.format.printf(({ timestamp, level, message, stack }) => {
    return `${timestamp} ${level}: ${stack || message}`;
  })
);

// Define file format (JSON with timestamps)
const fileFormat = winston.format.combine(
  winston.format.timestamp(),
  winston.format.json()
);

// Create the logger
const logger = winston.createLogger({
  level: process.env.NODE_ENV === 'production' ? 'info' : 'debug',
  levels: {
    error: 0,
    warn: 1,
    info: 2,
    http: 3,
    debug: 4,
  },
  transports: [
    new winston.transports.Console({ format: consoleFormat }),
    new winston.transports.File({
      filename: path.join(logDir, 'error.log'),
      level: 'error',
      format: fileFormat,
    }),
    new winston.transports.File({
      filename: path.join(logDir, 'combined.log'),
      format: fileFormat,
    }),
  ],
  exceptionHandlers: [
    new winston.transports.File({ filename: path.join(logDir, 'exceptions.log') }),
  ],
  exitOnError: false,
});

// Morgan stream to forward HTTP logs to winston
logger.stream = {
  write: (message) => {
    logger.http(message.trim());
  },
};

// Request logger middleware (basic)
const requestLogger = (req, res, next) => {
  logger.info(`${req.method} ${req.originalUrl}`);
  next();
};

// Morgan-based HTTP logger middleware
const morganLogger = morgan(
  ':remote-addr :method :url :status :res[content-length] - :response-time ms',
  { stream: logger.stream }
);

module.exports = {
  logger,
  requestLogger,
  morganLogger,
};
