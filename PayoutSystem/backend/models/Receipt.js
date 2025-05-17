// models/Receipt.js
const mongoose = require("mongoose");

const receiptSchema = new mongoose.Schema({
  mentor: { type: mongoose.Schema.Types.ObjectId, ref: 'User' },
  mentorName: { type: String, required: true },
  sessions: { type: mongoose.Schema.Types.ObjectId, ref: 'Session' },
  subtotal: { type: Number, required: true },
  tax: { type: Number, required: true },
  deductions: { type: Number, required: true },
  finalAmount: { type: Number, required: true },
  message: { type: String },
  status: {
    type: String,
    enum: ["paid", "pending", "in-review"],
    default: "pending"
  },
  isViewed: { type: Boolean, default: false } // <-- New field to track if mentor has seen it
}, { timestamps: true });

module.exports = mongoose.model("Receipt", receiptSchema);
