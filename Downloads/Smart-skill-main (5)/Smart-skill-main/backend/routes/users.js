import express from "express";
import User from "../models/User.js";
import { protect } from "../middleware/auth.js";

const router = express.Router();

// Get all users (for discovery/swiping)
router.get("/", protect, async (req, res) => {
  try {
    const users = await User.find({ _id: { $ne: req.userId } }).select("-password");
    res.status(200).json({ success: true, users });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

// Get user by ID
router.get("/:id", protect, async (req, res) => {
  try {
    const user = await User.findById(req.params.id).select("-password");
    if (!user) {
      return res.status(404).json({ message: "User not found" });
    }
    res.status(200).json({ success: true, user });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

// Add a match
router.post("/:id/match", protect, async (req, res) => {
  try {
    const user = await User.findById(req.userId);
    const targetUser = await User.findById(req.params.id);

    if (!targetUser) {
      return res.status(404).json({ message: "User not found" });
    }

    if (!user.matches.includes(req.params.id)) {
      user.matches.push(req.params.id);
      await user.save();
    }

    res.status(200).json({ success: true, message: "Match added", user });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

export default router;
