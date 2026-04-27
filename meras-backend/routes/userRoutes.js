const express = require("express");
const router = express.Router();
const  protect = require("../middleware/authMiddleware");
const requireRole = require("../middleware/roleMiddleware");
const { saveQuizResults, getSavedChallenges } = require("../controllers/userController");

// POST /users/:id/quiz-results — explorer saves their compass quiz results
router.post("/:id/quiz-results", protect, requireRole("explorer"), saveQuizResults);

// GET /users/me/saved-challenges — explorer fetches their saved challenges
router.get("/me/saved-challenges", protect, requireRole("explorer"), getSavedChallenges);

module.exports = router;
