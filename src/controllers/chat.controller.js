const Chat = require('../models/chat.model.js');

exports.sendMessage = async (req, res, next) => {
  try {
    const { message, roomId } = req.body;
    const chatMessage = await Chat.create({
      message,
      roomId,
      user: req.userId
    });

    res.status(201).json(chatMessage);
  } catch (err) {
    next(err);
  }
};

exports.getMessages = async (req, res, next) => {
  try {
    const messages = await Chat.find({ roomId: req.params.roomId });
    res.status(200).json(messages);
  } catch (err) {
    next(err);
  }
};
