const mongoose = require("mongoose");

const auditLogSchema = new mongoose.Schema(
  {
    user: { type: mongoose.Schema.Types.ObjectId, ref: "User" },
    action: String,
    targetType: String, // e.g., 'Session', 'Receipt'
    targetId: mongoose.Schema.Types.ObjectId,
    changes: mongoose.Schema.Types.Mixed, // can hold old/new values
  },
  { timestamps: true }
);

module.exports = mongoose.model("AuditLog", auditLogSchema);