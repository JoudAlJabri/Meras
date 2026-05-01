const express = require("express");
const multer = require("multer");
const path = require("path");
const router = express.Router();
const protect = require("../middleware/authMiddleware");
const requireRole = require("../middleware/roleMiddleware");
const { saveQuizResults, getSavedChallenges, updateExplorerSettings, updateGuideSettings, getDashboard, updateAvailability, getAvailability } = require("../controllers/userController");

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

// POST /users/:id/quiz-results — explorer saves their compass quiz results
router.post("/:id/quiz-results", protect, requireRole("explorer"), saveQuizResults);

// GET /users/me/saved-challenges — explorer fetches their saved challenges
router.get("/me/saved-challenges", protect, requireRole("explorer"), getSavedChallenges);

// PATCH /users/me/settings — explorer updates their profile settings
router.patch("/me/settings", protect, requireRole("explorer"), uploadProfileImage.single("profileImage"), updateExplorerSettings);

// PATCH /users/me/guide-settings — guide updates their profile settings
router.patch("/me/guide-settings", protect, requireRole("guide"), uploadProfileImage.single("profileImage"), updateGuideSettings);

// GET /users/me/dashboard — explorer dashboard summary
router.get("/me/dashboard", protect, requireRole("explorer"), getDashboard);

// PATCH /users/me/availability — guide sets their availability
router.patch("/me/availability", protect, requireRole("guide"), updateAvailability);

// GET /users/:id/availability — public, fetch a guide's available slots
router.get("/:id/availability", getAvailability);

module.exports = router;
