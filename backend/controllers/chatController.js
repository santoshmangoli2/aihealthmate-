// controllers/chatController.js
const { ChatMessage, Sequelize } = require("../models");

exports.sendMessage = async (req, res) => {
  try {
    const { message, senderId, receiverId } = req.body;

    if (!senderId || !receiverId || !message.trim()) {
      return res.status(400).json({ error: "Missing required fields" });
    }

    const newMessage = await ChatMessage.create({
      senderId,
      receiverId,
      message,
    });

    res.status(201).json({ success: true, message: "Message sent", data: newMessage });
  } catch (error) {
    console.error("Error sending message:", error);
    res.status(500).json({ error: "Failed to send message" });
  }
};

exports.getMessages = async (req, res) => {
  try {
    const { senderId, receiverId } = req.query;

    if (!senderId || !receiverId) {
      return res.status(400).json({ error: "Missing senderId or receiverId" });
    }

    const messages = await ChatMessage.findAll({
      where: {
        [Sequelize.Op.or]: [
          { senderId, receiverId },
          { senderId: receiverId, receiverId: senderId },
        ],
      },
      order: [["timestamp", "ASC"]],
    });

    res.json({ success: true, messages });
  } catch (error) {
    console.error("Error fetching messages:", error);
    res.status(500).json({ error: "Failed to fetch messages" });
  }
};
