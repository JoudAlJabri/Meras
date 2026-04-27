const express = require("express");
const cors = require("cors");
const dotenv = require("dotenv");
const connectDB = require("./config/db");
const submissionRoutes = require("./routes/submissionRoutes");

dotenv.config();

const app = express();

connectDB();

// ── MIDDLEWARE ──

app.use(cors()); // allows React frontend to talk to this server
app.use(express.json()); // allows the server to read JSON from request bodies
app.use(express.urlencoded({ extended: true }));

app.get("/", (req, res) => {
  res.send("Meras backend NEW TEST");
});

app.use("/api/auth", require("./routes/authRoutes"));
app.use("/api/challenges", require("./routes/challengeRoutes"));
app.use("/api/users", require("./routes/userRoutes"));
app.use("/submissions", submissionRoutes);
app.use("/uploads", express.static("uploads"));
app.use("/api/sessions", require("./routes/sessionRoutes"));

const PORT = process.env.PORT || 5000;

app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});