const mongoose = require("mongoose");

const sessionSchema = new mongoose.Schema(
  {
    mentor: { type: mongoose.Schema.Types.ObjectId, ref: "User", required: true },
    mentorName: { type: String, required: true }, // for quick lookup and display
    type: {
      type: String,
      enum: ["Live", "Evaluation", "Review"],
      required: true
    },
    date: { type: Date, required: true },
    duration: { type: Number, required: true },
    ratePerHour: { type: Number, required: true },
    status: { type: String, enum: ["pending", "paid","Pending"], default: "pending" },
    sessionCode: { type: String, unique: true }
  },
  { timestamps: true }
);

// Generate a unique session code before saving
sessionSchema.pre("save", function (next) {
  if (!this.sessionCode) {
    const shortId = this._id.toString().slice(-6).toUpperCase();
    this.sessionCode = `SID-${shortId}`;
  }
  next();
});

module.exports = mongoose.model("Session", sessionSchema);
