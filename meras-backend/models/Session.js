const mongoose = require("mongoose");

const sessionSchema = new mongoose.Schema(
  {
    mentorEmail: {
      type: String,
      required: true,
    },
    explorerEmail: {
      type: String,
      required: true,
    },
    slot: {
      type: Date,
      required: true,
    },
    topic: {
      type: String,
      required: true,
    },
    status: {
      type: String,
      enum: ["pending", "confirmed", "completed", "cancelled"],
      default: "pending",
    },
    meetingLink: { type: String, default: "" },
    emailSent:   { type: Boolean, default: false },
  },
  { timestamps: true }
);

module.exports = mongoose.model("Session", sessionSchema);


