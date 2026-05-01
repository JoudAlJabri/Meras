const mongoose = require("mongoose");
const dotenv = require("dotenv");
const Challenge = require("../models/Challenge");
const mockChallenges = require("./mockChallengesData");

dotenv.config();

const seedChallenges = async () => {
  try {
    await mongoose.connect(process.env.MONGO_URI);
    console.log("MongoDB connected for seeding");

    await Challenge.deleteMany();
    console.log("Old challenges removed");

    await Challenge.insertMany(mockChallenges);
    console.log("Mock challenges inserted successfully");

    process.exit();
  } catch (error) {
    console.error("Seeding failed:", error.message);
    process.exit(1);
  }
};

seedChallenges();