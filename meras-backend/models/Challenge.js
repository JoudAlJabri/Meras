const mongoose = require("mongoose");

const challengeSchema = new mongoose.Schema(
  {
    title: {
      type: String,
      required: true,
    },
    major: {
      type: String,
      required: true,
    },
    mentorName: {
      type: String,
    },
    mentorId: {
      type: String,
    },
    tags: [String],
    description: {
      type: String,
    },
    difficulty: {
      type: String,
      enum: ["Beginner", "Intermediate", "Advanced"],
      required: true,
    },
    timeEstimate: {
      type: Number,
      required: true,
    },
    whatYouWillLearn: [String],
    whatYouWillDo: [String],
    whatYouWillNeed: [String],
    instructions: {
      type: String,
      required: true,
    },
    referenceLinks: [
      {
        title: String,
        url: String,
      },
    ],
    downloadableFiles: [
      {
        fileName: String,
        fileUrl: String,
      },
    ],
  },
  { timestamps: true }
);

module.exports = mongoose.model("Challenge", challengeSchema);