const mongoose = require("mongoose");
require("dotenv").config();


const User = require("./models/User");
const Challenge = require("./models/Challenge");
const Submission = require("./models/Submission");
const Session = require("./models/Session"); 


const connectDB = async () => {
  try {
    await mongoose.connect(process.env.MONGO_URI);
    console.log("MongoDB connected (seed)");
  } catch (err) {
    console.error("Connection error:", err.message);
    process.exit(1);
  }
};

const run = async () => {
  await connectDB();

  // Read Notion summary under Jana's Task 3 !!

  /* //await User.deleteMany(); !!!! be carefull
  /*await Challenge.deleteMany();
  //await Submission.deleteMany();

  console.log("Old data cleared");

  const explorer = await User.create({
  name: "Explorer User",
  email: "explorer_seed@gmail.com",
  password: "12345678",
  role: "explorer",
  gender: "female",
  grade: "Grade 11",
  emailVerified: true,
});

const guide = await User.create({
  name: "Guide User",
  email: "guide_seed@gmail.com",
  password: "12345678",
  role: "guide",
  university: "KFUPM",
  major: "Software Engineering",
  transcript: "test.pdf", 
  emailVerified: true,
  guideStatus: "approved",
});

const admin = await User.create({
  name: "Admin User",
  email: "admin_seed@gmail.com",
  password: "12345678",
  role: "admin",
  emailVerified: true,
});

console.log("Users created");

const challenge = await Challenge.create({
  title: "Intro to Software Engineering",
  major: "Software Engineering",
  mentorName: guide.name,
  mentorId: guide._id, // 🔗 LINK TO GUIDE

  tags: ["coding", "problem-solving"],

  description: "Learn basics of software engineering",

  difficulty: "Beginner",
  timeEstimate: 2,

  whatYouWillLearn: ["Basics of coding", "Problem solving"],
  whatYouWillDo: ["Solve simple problems"],
  whatYouWillNeed: ["Computer"],

  instructions: "Complete the given tasks",

  referenceLinks: [
    {
      title: "Intro Guide",
      url: "https://example.com"
    }
  ],

  downloadableFiles: [
    {
      fileName: "starter.pdf",
      fileUrl: "/uploads/sample.pdf"
    }
  ]
});

console.log("Challenge created");


const submission = await Submission.create({
  challengeId: challenge._id,   //  link to challenge
  explorerId: explorer._id,     //  link to explorer
  guideId: guide._id,           //  link to guide

  submissionType: "text",
  textAnswer: "This is my solution",

  status: "pending",
});

console.log("Submission created");

const sessions = await Session.insertMany([
  {
    mentorEmail: "joudii188@gmail.com",
    explorerEmail: "sara@gmail.com",
    slot: new Date("2026-05-01T10:00:00Z"),
    topic: "Intro to Software Engineering",
    status: "pending",
  },
  {
    mentorEmail: "joudii188@gmail.com",
    explorerEmail: "joud.jab@gmail.com",
    slot: new Date("2026-05-02T14:00:00Z"),
    topic: "Career Guidance",
    status: "confirmed",
  },
  {
    mentorEmail: "joudii188@gmail.com",
    explorerEmail: "explorer@test.com",
    slot: new Date("2026-05-03T16:00:00Z"),
    topic: "Project Review",
    status: "completed",
  }
]);

console.log("Sessions created");*/


  process.exit();
};

run();