const mongoose = require("mongoose");
const bcrypt = require("bcrypt");

const userSchema = new mongoose.Schema(
  {
    name: {
      type: String,
      required: true,
    },
    email: {
      type: String,
      required: true,
      unique: true,
    },
    password: {
      type: String,
      required: true,
    },
    role: {
      type: String,
      enum: ["explorer", "guide", "admin"],
      default: "explorer",
    },

    // Shared
    profilePhoto: { type: String },

    // Guide-specific (required at signup)
    university: {
      type: String,
      required: function () {
        return this.role === "guide";
      },
    },
    major: {
      type: String,
      required: function () {
        return this.role === "guide";
      },
    },
    transcript: {
      type: String,
      required: function () {
        return this.role === "guide";
      },
      validate: {
        validator: function (v) {
          return /\.(pdf|png|jpg|jpeg)$/i.test(v);
        },
        message: "Transcript must be a PDF or image file (png, jpg, jpeg)",
      },
    },

    // Guide approval status (managed by admin)
    guideStatus: {
      type: String,
      enum: ["pending", "approved", "rejected"],
      default: function () {
        return this.role === "guide" ? "pending" : undefined;
      },
    },

    // Guide-specific (filled in GuideSettings)
    about: { type: String }, // filled in edit account
    skills: [{ type: String }], // filled in edit account
    rating: { type: Number, default: 0 }, // filled by explorers
    reviews: [ // filled by explorers
      {
        explorer: { type: mongoose.Schema.Types.ObjectId, ref: "User" },
        rating: { type: Number, min: 1, max: 5 },
        comment: { type: String },
        createdAt: { type: Date, default: Date.now },
      },
    ],
    availability: [  // filled in mentorDirectory 
      {
        date: { type: String },
        slots: [{ type: String }],
      },
    ],

    // Explorer-specific (required at signup)

    gender: {
      required: function () {
        return this.role === "explorer";
      },
      type: String,
      enum: ["female" , "male"],
    },

     grade: {
      required: function () {
        return this.role === "explorer";
      },
      type: String,
      enum: ["Grade 10" , "Grade 11" , "Grade 12"],
    },

    // Explorer-specific (filles later)

    interests: [{ type: String }], // incremented when the explorer takes the quiz

    recommendedMajors: [{ type: String }], // depends on interests, to filter the recommended majors based on the interests

    completedChallenges: [
      { type: mongoose.Schema.Types.ObjectId, ref: "Challenge" },
    ],

    savedChallenges: [ // the challnges the user save for later (still no front-end for that yet)
      { type: mongoose.Schema.Types.ObjectId, ref: "Challenge" },
    ],
  },
  { timestamps: true }
);

userSchema.pre("save", async function () {
  if (!this.isModified("password")) return;

  const salt = await bcrypt.genSalt(10);
  this.password = await bcrypt.hash(this.password, salt);
});

userSchema.methods.matchPassword = async function (enteredPassword) {
  return await bcrypt.compare(enteredPassword, this.password);
};

module.exports = mongoose.model("User", userSchema);