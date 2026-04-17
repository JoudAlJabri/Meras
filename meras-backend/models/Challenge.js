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
    difficulty: {
      type: String,
      enum: ["Beginner", "Intermediate", "Advanced"],
      required: true,
    },
    timeEstimate: {
      type: String,
      required: true,
    },
    instructions: {
      type: String,
      required: true,
    },
    description: {
      type: String,
    },
    category: {
      type: String,
    },
    skills: [
      {
        type: String,
      },
    ],
    resources: [
      {
        type: String,
      },
    ],
    status: {
      type: String,
      enum: ["Open", "Closed"],
      default: "Open",
    },
  },
  { timestamps: true }
);

module.exports = mongoose.model("Challenge", challengeSchema);