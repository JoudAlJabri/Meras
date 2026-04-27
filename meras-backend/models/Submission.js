

const mongoose = require("mongoose");

const submissionSchema = new mongoose.Schema({
  challengeId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "Challenge",
    required: true
  },
  explorerId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "User",
    required: true
  },
  guideId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "User",
    required: true
  },
  submissionType: {
    type: String,
    enum: ["file", "text", "canvas"],
    required: true
  },
  fileUrl: String,
  textAnswer: String,
  canvasUrl: String,
  status: {
    type: String,
    enum: ["pending", "graded"],
    default: "pending"
  },
  stars: {
    type: Number,
    min: 1,
    max: 5
  },
  feedback: String
}, { timestamps: true });

module.exports = mongoose.model("Submission", submissionSchema);