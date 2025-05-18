const Message = require("../models/Message");

exports.getMessages = async (req, res) => {
  try {
    const userId = req.user._id;

    const messages = await Message.find({
      $or: [{ senderId: userId }, { recipientId: userId }],
    }).sort({ timestamp: 1 }).lean();

    const stringified = messages.map((msg) => ({
      ...msg,
      senderId: msg.senderId.toString(),
      recipientId: msg.recipientId.toString(),
    }));

    res.status(200).json(stringified);
  } catch (err) {
    res.status(500).json({ message: "Failed to load messages" });
  }
};

exports.sendMessage = async (req, res) => {
  try {
    const { content, recipientId } = req.body;

    const message = await Message.create({
      senderId: req.user._id,
      senderName: req.user.name,
      recipientId,
      content,
      timestamp: new Date(),
      read: false,
    });

    const messageObject = message.toObject();
    messageObject.senderId = message.senderId.toString();
    messageObject.recipientId = message.recipientId.toString();

    res.status(201).json(messageObject);
  } catch (err) {
    res.status(500).json({ message: "Failed to send message" });
  }
};
