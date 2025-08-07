const mongoose = require('mongoose');
const { logger } = require('../middleware/logger.middleware')
require('dotenv').config();

const connectDB = async () => {
  try {
    await mongoose.connect(process.env.MONGODB_URI);
    logger.info('MongoDB Connected');
  } catch (err) {
    logger.error('Database connection error:', err);
    process.exit(1);
  }
};

module.exports = connectDB;
