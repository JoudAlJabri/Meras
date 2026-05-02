const express = require("express");
const multer = require("multer");
const path = require("path");
const router = express.Router();
const protect = require("../middleware/authMiddleware");
const requireRole = require("../middleware/roleMiddleware");

const {
  saveQuizResults,
  getSavedChallenges,
  updateExplorerSettings,
  updateGuideSettings,
  getDashboard,
  getGuideDashboard,
  getMentors,
  getMentorById,
  updateAvailability,
} = require("../controllers/userController");

const profileStorage = multer.diskStorage({
  destination: (req, file, cb) => cb(null, "uploads/profiles/"),
  filename: (req, file, cb) => cb(null, `${Date.now()}_${file.originalname}`),
});
const uploadProfileImage = multer({
  storage: profileStorage,
  limits: { fileSize: 5 * 1024 * 1024 },
  fileFilter: (req, file, cb) => {
    const allowed = [".jpg", ".jpeg", ".png"];
    const ext = path.extname(file.originalname).toLowerCase();
    allowed.includes(ext) ? cb(null, true) : cb(new Error("Only JPG and PNG images are allowed"));
  },
});

// POST /api/users/:id/quiz-results — explorer saves compass quiz results
router.post("/:id/quiz-results", protect, requireRole("explorer"), saveQuizResults);

// GET /api/users/me/saved-challenges — explorer fetches their saved challenges
router.get("/me/saved-challenges", protect, requireRole("explorer"), getSavedChallenges);

// PATCH /api/users/me/settings — explorer updates their profile
router.patch("/me/settings", protect, requireRole("explorer"), uploadProfileImage.single("profileImage"), updateExplorerSettings);

// PATCH /api/users/me/guide-settings — guide updates their profile
router.patch("/me/guide-settings", protect, requireRole("guide"), uploadProfileImage.single("profileImage"), updateGuideSettings);

// GET /api/users/me/dashboard — explorer dashboard summary
router.get("/me/dashboard", protect, requireRole("explorer"), getDashboard);

// GET /api/users/me/guide-dashboard — guide dashboard summary
router.get("/me/guide-dashboard", protect, requireRole("guide"), getGuideDashboard);

// GET /api/mentors — public, all approved guides with ?major= and ?university= filters
router.get("/mentors", getMentors);

// GET /api/mentors/:id — public, single mentor profile + their challenges
router.get("/mentors/:id", getMentorById);

// PUT /api/users/:id/availability — guide saves their weekly availability
router.put("/:id/availability", protect, requireRole("guide"), updateAvailability);

module.exports = router;