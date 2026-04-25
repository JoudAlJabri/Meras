const express = require("express");
const router = express.Router();
const { protect } = require("../middleware/authMiddleware");
const requireRole = require("../middleware/roleMiddleware");
const {
  getChallenges,
  getChallengeById,
  getChallengesByGuide,
  createChallenge,
  updateChallenge,
  deleteChallenge,
} = require("../controllers/challengeContoller");

// Public
router.get("/", getChallenges);

// /guide/:guideId must be before /:id to avoid conflict
router.get("/guide/:guideId", protect, requireRole("guide"), getChallengesByGuide);

router.get("/:id", getChallengeById);

// Guide only — create
router.post("/", protect, requireRole("guide"), createChallenge);

// Guide only — edit their own
router.put("/:id", protect, requireRole("guide"), updateChallenge);

// Guide or admin — delete
router.delete("/:id", protect, requireRole("guide", "admin"), deleteChallenge);

module.exports = router;
