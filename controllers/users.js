const express = require("express");
const router = express.Router();
const verifyToken = require("../middleware/verify-token");

const User = require("../models/user");

/*-------------------- Routes ----------------------*/

// Get a user by id (Protected route)
router.get("/:userId", verifyToken, async (req, res) => {
  try {
    if (req.user._id !== req.params.userId) {
      return res.status(403).json({ err: "Unauthorized" });
    }

    const user = await User.findById(req.params.userId);

    if (!user) {
      return res.status(404).json({ err: "User not found." });
    }

    res.json({ user });
  } catch (err) {
    res.status(500).json({ err: err.message });
  }
});

// Update a user by id (Protected route)
router.put("/:userId", verifyToken, async (req, res) => {
  try {
    if (req.user._id !== req.params.userId) {
      return res.status(403).json({ err: "Unauthorized" });
    }

    const user = await User.findByIdAndUpdate(req.params.userId, req.body, {
      new: true,
    });

    if (!user) {
      return res.status(404).json({ err: "User not found." });
    }

    res.json({ user });
  } catch (err) {
    res.status(500).json({ err: err.message });
  }
});

// Delete a user by ID (Protected route)
router.delete("/:userId", verifyToken, async (req, res) => {
  try {
    if (req.user._id !== req.params.userId) {
      return res.status(403).json({ err: "Unauthorized" });
    }

    const user = await User.findByIdAndDelete(req.params.userId);

    if (!user) {
      return res.status(404).json({ err: "User not found." });
    }

    res.json({ msg: "User deleted." });
  } catch (err) {
    res.status(500).json({ err: err.message });
  }
});

module.exports = router;
