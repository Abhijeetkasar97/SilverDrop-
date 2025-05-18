const Session = require("../models/Session");
const Receipt = require("../models/Receipt");

exports.addSession = async (req, res) => {
  const session = await Session.create(req.body);
  res.json(session);
};

exports.generateReceipt = async (req, res) => {
  try {
    const { sessionId, message } = req.body;

    // Find session with status "Pending" and populate mentor name
    const session = await Session.findOne({ _id: sessionId, status: "Pending" }).populate("mentor", "name");
    if (!session) {
      return res.status(404).json({ error: "Session not found or already paid." });
    }

    // Calculate amounts
    const subtotal = (session.duration / 60) * session.ratePerHour;
    const tax = subtotal * 0.18;
    const deductions = 100;
    const finalAmount = subtotal + tax - deductions;

    // Create receipt with mentorName
    const receipt = await Receipt.create({
      mentor: session.mentor._id,
      mentorName: session.mentor.name,
      sessions: sessionId,
      subtotal,
      tax,
      deductions,
      finalAmount,
      message,
      status: "paid"
    });

    // Update session status
    await Session.findByIdAndUpdate(sessionId, { status: "paid" });
   
    res.json(receipt);

  } catch (error) {
    console.error(error);
    res.status(500).json({ error: "Internal server error." });
  }
};
exports.getSession = async (req, res) => {
  const { sessionId } = req.body;
  let session = await Session.find({ _id: sessionId, status: "Pending" });
  res.json(session);
};
