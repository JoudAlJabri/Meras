// models/Submission.js
const mongoose = require("mongoose");

const submissionSchema = new mongoose.Schema({
  challengeId:    { type: mongoose.Schema.Types.ObjectId, ref: "Challenge", required: true },
  explorerId:     { type: mongoose.Schema.Types.ObjectId, ref: "User", required: true },
  guideId:        { type: mongoose.Schema.Types.ObjectId, ref: "User" },
  submissionType: { type: String, enum: ["file", "text", "canvas"], required: true },

  // only one of these will be filled depending on submissionType
  fileUrl:        { type: String, default: "" },  // for file uploads
  textAnswer:     { type: String, default: "" },  // for text submissions
  canvasUrl:      { type: String, default: "" },  // for canvas drawings

  // grading — filled in by the guide
  status:         { type: String, enum: ["pending", "graded"], default: "pending" },
  stars:          { type: Number, min: 1, max: 5, default: null },
  feedback:       { type: String, default: "" },
}, { timestamps: true });

module.exports = mongoose.model("Submission", submissionSchema);