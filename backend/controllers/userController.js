import User from "../models/User.js";

// GET all users
export const getUsers = async (req, res) => {
  try {
    const users = await User.find().sort({ lastSeen: -1 });
    res.json(users);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

// Ban user
export const banUser = async (req, res) => {
  try {
    const { id } = req.params;
    await User.findByIdAndUpdate(id, { isBanned: true });
    res.json({ message: "User banned successfully" });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

// Unban user
export const unbanUser = async (req, res) => {
  try {
    const { id } = req.params;
    await User.findByIdAndUpdate(id, { isBanned: false });
    res.json({ message: "User unbanned successfully" });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};
