const express = require("express");
const {
  addSession,
  generateReceipt
} = require("../controllers/adminController");
const { protect, adminOnly } = require("../middleware/auth");
const User = require("../models/User");
const { sendReceiptEmail } = require("../utils/emailService");
const Receipt = require("../models/Receipt");
const Session = require("../models/Session");
const router = express.Router();

router.use(protect, adminOnly);

router.post("/add-session", addSession);
// router.get("/get-session",gets)
router.post("/generate-receipt", generateReceipt);
router.post("/getMentorByEmail", async (req, res) => {
  const { email } = req.body;
  const user = await User.findOne({ email, role: "mentor" }).select(
    "name email"
  );
  if (!user) return res.status(404).json({ message: "Mentor not found" });
  res.json(user);
});
router.get("/sessions", async (req, res) => {
  const sessions = await Session.find().populate("mentor", "name email");
  res.json(sessions);
});
router.get("/receipts", async (req, res) => {
  const receipts = await Receipt.find().populate("mentor", "name email");
  res.json(receipts);
});
router.get("/mentors", async (req, res) => {
  const mentorsRaw = await User.find({ role:"mentor" })
  const mentors = mentorsRaw.map(({ _id, name, email }) => ({
    id: _id.toString(),
    name,
    email
  }));
  res.json(mentors);
});

module.exports = router;
