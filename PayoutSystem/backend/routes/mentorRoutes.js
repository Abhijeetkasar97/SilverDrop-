const express = require("express");
const { protect, mentorOnly } = require("../middleware/auth");
const Receipt = require("../models/Receipt");
const Session = require("../models/Session");

const router = express.Router();

router.use(protect, mentorOnly);

router.get("/receipts", async (req, res) => {
  const receipts = await Receipt.find({ mentor: req.user._id }).populate('sessions');
  res.json(receipts);
});
router.post("/sessions", protect, mentorOnly, async (req, res) => {
  const { type, date, duration, ratePerHour } = req.body;
  try {
    const session = new Session({
      mentor: req.user._id,
      type,
      duration,
      ratePerHour,
      date,
    });
    await session.save();
    res.status(201).json({ message: "Session created", session });
  } catch (err) {
    console.error("Error creating session:", err);
    res.status(500).json({ error: "Failed to create session", details: err.message });
  }
});
// Get sessions for mentor
router.get("/sessions", protect, mentorOnly, async (req, res) => {
  try {
    const sessions = await Session.find({ mentor: req.user._id });
    res.json(sessions);
  } catch (err) {
    res.status(500).json({ error: "Failed to fetch sessions" });
  }
});


module.exports = router;
