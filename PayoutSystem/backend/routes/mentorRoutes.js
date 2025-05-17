const express = require("express");
const { protect, mentorOnly } = require("../middleware/auth");
const Receipt = require("../models/Receipt");
const Session = require("../models/Session");

const router = express.Router();

// Protect all mentor routes
router.use(protect, mentorOnly);

// 🧾 GET mentor's receipts with populated session details
// router.get("/receipts", async (req, res) => {
//   try {
//     const receipts = await Receipt.find({ mentor: req.user._id }).populate("sessions");
//     res.json(receipts);
//   } catch (err) {
//     res.status(500).json({ error: "Failed to fetch receipts", details: err.message });
//   }
// });

// ➕ POST: Create a new session
router.post("/sessions", async (req, res) => {
  const { type, date, duration, ratePerHour, status = "Pending" } = req.body;

  try {
    const session = new Session({
      mentor: req.user._id,
      mentorName: req.user.name, // ✅ Add mentor name from logged-in user
      type,
      date,
      duration,
      ratePerHour,
      status
    });

    await session.save();

    res.status(201).json({ message: "Session created", session });
  } catch (err) {
    console.error("Error creating session:", err);
    res.status(500).json({ error: "Failed to create session", details: err.message });
  }
});

// 📄 GET: All sessions for this mentor
router.get("/sessions", async (req, res) => {
  try {
    const sessions = await Session.find({ mentor: req.user._id }).sort({ date: -1 });
    res.json(sessions);
  } catch (err) {
    res.status(500).json({ error: "Failed to fetch sessions", details: err.message });
  }
});
router.get("/receipts", async (req, res) => {
  try {
    const filter = { mentor: req.user._id };
    if (req.query.isViewed === "false") filter.isViewed = false;

    const receipts = await Receipt.find(filter).populate("sessions");
    res.json(receipts);
  } catch (err) {
    res.status(500).json({ error: "Failed to fetch receipts" });
  }
});

// POST mark receipt as viewed
router.post("/receipts/:id/viewed", async (req, res) => {
  try {
    const receipt = await Receipt.findOneAndUpdate(
      { _id: req.params.id, mentor: req.user._id },
      { isViewed: true },
      { new: true }
    );
    if (!receipt) return res.status(404).json({ error: "Receipt not found" });
    res.json({ message: "Receipt marked as viewed" });
  } catch (err) {
    res.status(500).json({ error: "Failed to mark receipt as viewed" });
  }
});

module.exports = router;
