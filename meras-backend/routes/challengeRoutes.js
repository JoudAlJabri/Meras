const express = require("express");
const router = express.Router();
const { protect } = require("../middleware/authMiddleware");
const requireRole = require("../middleware/roleMiddleware");

// Public route
router.get("/", (req, res) => {
  res.send("Get all challenges");
});

// Protected route - only admin can create a challenge
router.post("/", protect, requireRole("admin"), (req, res) => {
  res.send("Challenge created");
});

// Protected route - admin or guide can update a challenge
router.put("/:id", protect, requireRole("admin", "guide"), (req, res) => {
  res.send("Challenge updated");
});

module.exports = router;