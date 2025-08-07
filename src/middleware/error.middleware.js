const { logger } = require("./logger.middleware");


module.exports = (err, req, res, next) => {
  logger.error(err.stack);
  res.status(err.status || 500).json({
    message: err.message || 'Internal Server Error',
    stack: process.env.NODE_ENV === 'development' ? err.stack : {}
  });
};
