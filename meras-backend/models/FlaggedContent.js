const mongoose = require("mongoose");

const flaggedContentSchema = new mongoose.Schema(
  {
    content: {
      type: String,
      required: true,
    },
    reportedBy: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
      required: true,
    },
    reason: {
      type: String,
      required: true,
    },
    status: {
      type: String,
      enum: ["Pending", "Dismissed", "Deleted"],
      default: "Pending",
    },
    removalAuditReason: {
      type: String,
      default: "",
    },
    contentType: {
      type: String,
      enum: ["challenge", "review", "submission", "other"],
      default: "other",
    },
    contentId: {
      type: mongoose.Schema.Types.ObjectId,
    },
  },
  { timestamps: true }
);

module.exports = mongoose.model("FlaggedContent", flaggedContentSchema);