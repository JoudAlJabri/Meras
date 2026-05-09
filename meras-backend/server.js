const express = require("express");
const cors = require("cors");
const dotenv = require("dotenv");
const connectDB = require("./config/db");
const submissionRoutes = require("./routes/submissionRoutes");
const { startSessionReminderJob } = require("./jobs/sessionReminder");

dotenv.config();

const app = express();

connectDB();
if (process.env.NODE_ENV !== 'production') {
  startSessionReminderJob();
}

// ── MIDDLEWARE ──

app.use(cors({
  origin: "https://meras1-five.vercel.app"
})); // allows React frontend to talk to this server
app.use(express.json({ limit: '10mb' }));
app.use(express.urlencoded({ extended: true, limit: '10mb' }));

app.get("/", (req, res) => {
  res.send("Meras backend NEW TEST");
});

app.use("/api/auth", require("./routes/authRoutes"));
app.use("/api/challenges", require("./routes/challengeRoutes"));
app.use("/api/users", require("./routes/userRoutes"));
app.use("/api/submissions", submissionRoutes);
app.use("/uploads", express.static("uploads"));
app.use("/api/sessions", require("./routes/sessionRoutes"));
app.use("/api/admin", require("./routes/adminRoutes"));
const reviewRoutes = require("./routes/reviewRoutes");

app.use("/api/reviews", reviewRoutes);

if (process.env.NODE_ENV !== 'production') {
  const PORT = process.env.PORT || 5000;
  app.listen(PORT, () => {
    console.log(`Server running on port ${PORT}`);
  });
}

module.exports = app;