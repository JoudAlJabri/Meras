const express = require("express");
const router = express.Router();
const { protect } = require("../middleware/authMiddleware");
const requireRole = require("../middleware/roleMiddleware");

router.get("/profile", protect, (req, res) => {
  res.json(req.user);
});

router.get("/mentor-area", protect, requireRole("mentor"), (req, res) => {
  res.send("Welcome mentor");
});

router.get("/admin-area", protect, requireRole("admin"), (req, res) => {
  res.send("Welcome admin");
});

module.exports = router;