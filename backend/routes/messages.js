import express from "express";
import Message from "../models/Message.js";
import { protect } from "../middleware/auth.js";

const router = express.Router();

// Get messages between two users
router.get("/:userId", protect, async (req, res) => {
  try {
    const messages = await Message.find({
      $or: [
        { sender: req.userId, receiver: req.params.userId },
        { sender: req.params.userId, receiver: req.userId },
      ],
    })
      .sort({ createdAt: 1 })
      .populate("sender", "name avatar")
      .populate("receiver", "name avatar");

    res.status(200).json({ success: true, messages });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

// Send a message
router.post("/", protect, async (req, res) => {
  try {
    const { receiver, text } = req.body;

    const message = new Message({
      sender: req.userId,
      receiver,
      text,
    });

    await message.save();
    await message.populate("sender", "name avatar");
    await message.populate("receiver", "name avatar");

    res.status(201).json({ success: true, message });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

export default router;
