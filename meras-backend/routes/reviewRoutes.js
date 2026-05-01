const express = require("express");
const router = express.Router();
const protect = require("../middleware/authMiddleware");
const requireRole = require("../middleware/roleMiddleware");

const {
  createReview,
  getReviewsByMentor,
} = require("../controllers/reviewController");

// Explorer submits review
router.post("/", protect, requireRole("explorer"), createReview);

// Get mentor reviews
router.get("/mentor/:mentorId", getReviewsByMentor);

module.exports = router;