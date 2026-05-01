const mongoose = require("mongoose");

const announcementSchema = new mongoose.Schema(
  {
    title: {
      type: String,
      required: true,
    },
    message: {
      type: String,
      required: true,
    },
    targetAudience: {
      type: String,
      enum: ["All", "Explorers", "Guides"],
      default: "All",
    },
    status: {
      type: String,
      enum: ["Published", "Draft"],
      default: "Published",
    },
    createdBy: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
    },
  },
  { timestamps: true }
);

module.exports = mongoose.model("Announcement", announcementSchema);