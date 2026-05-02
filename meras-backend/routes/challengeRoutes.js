const express = require("express");
const router = express.Router();
const protect = require("../middleware/authMiddleware");
const requireRole = require("../middleware/roleMiddleware");

const {
  getChallenges,
  getChallengeById,
  getChallengesByGuide,
  createChallenge,
  updateChallenge,
  deleteChallenge,
  startChallenge,
  completeChallenge,
  saveChallenge,
  unsaveChallenge,
} = require("../controllers/challengeController");

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

// Explorer only — start / complete / save / unsave
router.post("/:id/start", protect, requireRole("explorer"), startChallenge);
router.post("/:id/complete", protect, requireRole("explorer"), completeChallenge);
router.post("/:id/save", protect, requireRole("explorer"), saveChallenge);
router.delete("/:id/save", protect, requireRole("explorer"), unsaveChallenge);

module.exports = router;
