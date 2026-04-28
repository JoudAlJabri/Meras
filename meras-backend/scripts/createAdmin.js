const mongoose = require("mongoose");
const dotenv = require("dotenv");
const User = require("../models/User");

dotenv.config();

const createAdmin = async () => {
  try {
    console.log("Connecting to DB...");

    await mongoose.connect(process.env.MONGO_URI);

    console.log("Connected!");

    const existingAdmin = await User.findOne({ email: "admin@meras.com" });

    if (existingAdmin) {
      console.log("Admin already exists");
      process.exit();
    }

    const admin = await User.create({
      name: "Admin",
      email: "admin@meras.com",
      password: "admin123",
      role: "admin",
      emailVerified: true,
    });

    console.log("Admin created:", admin.email);

    process.exit();
  } catch (error) {
    console.error("ERROR:", error);
    process.exit(1);
  }
};

createAdmin();
