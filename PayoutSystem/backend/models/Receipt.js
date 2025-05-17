const mongoose = require("mongoose");

const receiptSchema = new mongoose.Schema({
    mentor: { type: mongoose.Schema.Types.ObjectId, ref: 'User' },
    sessions: { type: mongoose.Schema.Types.ObjectId, ref: 'Session' },
    subtotal: Number,
    tax: Number,
    deductions: Number,
    finalAmount: Number,
    message: String,
    status:{type:String,enum:["paid","pending","in-review"],default:"pending"}
}, { timestamps: true });

module.exports = mongoose.model("Receipt", receiptSchema);
