const express = require("express");
const multer = require("multer");
const path = require("path");
const router = express.Router();

const { register, login, verifyEmail, resendVerification, getMe } = require("../controllers/authController");
const { protect } = require("../middleware/authMiddleware");

// Multer for guide transcript uploads
const transcriptStorage = multer.diskStorage({
  destination: (req, file, cb) => cb(null, "uploads/transcripts/"),
  filename: (req, file, cb) => cb(null, `${Date.now()}_${file.originalname}`),
});
const uploadTranscript = multer({
  storage: transcriptStorage,
  limits: { fileSize: 5 * 1024 * 1024 },
  fileFilter: (req, file, cb) => {
    const allowed = [".pdf", ".jpg", ".jpeg", ".png"];
    const ext = path.extname(file.originalname).toLowerCase();
    allowed.includes(ext) ? cb(null, true) : cb(new Error("Only PDF, JPG, PNG allowed"));
  },
});

// POST /auth/register
router.post("/register", uploadTranscript.single("transcript"), register);

// POST /auth/login
router.post("/login", login);

// GET /auth/verify-email/:token
router.get("/verify-email/:token", verifyEmail);

// POST /auth/resend-verification
router.post("/resend-verification", resendVerification);

// GET /auth/me — protected
router.get("/me", protect, getMe);

module.exports = router;
