const mongoose = require("mongoose");

const sessionSchema = new mongoose.Schema(
  {
    mentor: { type: mongoose.Schema.Types.ObjectId, ref: "User" },
    type: {
      type: String,
      enum: ["Live", "Evaluation", "Review"],
      required: true
    },
    date: Date,
    duration: Number,
    ratePerHour: Number,
    status: { type: String, default: "Pending" }
  },
  { timestamps: true }
);

module.exports = mongoose.model("Session", sessionSchema);
