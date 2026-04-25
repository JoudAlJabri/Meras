const express = require("express");
const router = express.Router();
const { protect } = require("../middleware/authMiddleware");
const requireRole = require("../middleware/roleMiddleware");
const { saveQuizResults } = require("../controllers/userController");

// POST /users/:id/quiz-results — explorer saves their compass quiz results
router.post("/:id/quiz-results", protect, requireRole("explorer"), saveQuizResults);

module.exports = router;
