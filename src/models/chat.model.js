const mongoose = require('mongoose');

const chatSchema = new mongoose.Schema({
  message: { type: String, required: true },
  roomId: { type: String, required: true },
  user: { type: mongoose.Schema.Types.ObjectId, ref: 'User ' }
}, { timestamps: true });

module.exports = mongoose.model('Chat', chatSchema);
