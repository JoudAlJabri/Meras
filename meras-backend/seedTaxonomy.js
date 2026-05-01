const mongoose = require("mongoose");
const dotenv = require("dotenv");
dotenv.config();

const Taxonomy = require("./models/Taxonomy");

const universities = [
  "King Fahd University of Petroleum and Minerals (KFUPM)",
  "King Abdulaziz University (KAU)",
  "King Saud University (KSU)",
  "King Abdullah University of Science and Technology (KAUST)",
  "Princess Nourah bint Abdulrahman University (PNU)",
  "Imam Abdulrahman Bin Faisal University (IAU)",
  "Taibah University",
  "Taif University",
  "Qassim University",
  "Umm Al-Qura University",
  "Other",
];

const majors = [
  "Software Engineering",
  "Computer Science",
  "Information Technology",
  "Data Science",
  "Cybersecurity",
  "Electrical Engineering",
  "Mechanical Engineering",
  "Civil Engineering",
  "Architecture",
  "Business Administration",
  "Finance",
  "Accounting",
  "Marketing",
  "Medicine",
  "Pharmacy",
  "Nursing",
  "Law",
  "Education",
  "Psychology",
  "Graphic Design",
  "Other",
];

const seed = async () => {
  try {
    await mongoose.connect(process.env.MONGO_URI);
    console.log("Connected to MongoDB");

    // Delete existing taxonomy and create fresh
    await Taxonomy.deleteMany();
    await Taxonomy.create({ universities, majors });

    console.log("Taxonomy seeded successfully");
    process.exit(0);
  } catch (err) {
    console.error("Seed error:", err.message);
    process.exit(1);
  }
};

seed();