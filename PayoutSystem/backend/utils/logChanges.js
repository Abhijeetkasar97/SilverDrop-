const AuditLog = require("../models/AuditLog");

const logChange = async ({ userId, action, targetType, targetId, changes }) => {
  await AuditLog.create({ user: userId, action, targetType, targetId, changes });
};

module.exports = logChange;