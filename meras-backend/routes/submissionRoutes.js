const express  = require("express");
const router   = express.Router();
const multer   = require("multer");
const path     = require("path");

const {
  createSubmission,
  gradeSubmission,
  getSubmissionsByGuide,
  getSubmissionsByExplorer,
} = require("../controllers/submissionController");

//const protect     = require("../middleware/authMiddleware");
const { protect } = require("../middleware/authMiddleware");
const requireRole = require("../middleware/roleMiddleware");

// ── MULTER SETUP ─────────────────────────────
// Tells multer where to save uploaded files and what to name them
const storage = multer.diskStorage({
  destination: (req, file, cb) => {
    cb(null, "uploads/submissions/"); // save here
  },
  filename: (req, file, cb) => {
    // filename = userId_timestamp_originalname  e.g. "abc123_1234567890_solution.pdf"
    cb(null, `${req.user.id}_${Date.now()}_${file.originalname}`);
  },
});
const upload = multer({ storage, limits: { fileSize: 10 * 1024 * 1024 } }); // 10MB max

// ── ROUTES ───────────────────────────────────
// POST /submissions — explorer submits work
router.post(
  "/",
  protect,
  requireRole("explorer"),
  upload.single("file"), // "file" must match the field name your React form uses
  createSubmission
);

// PATCH /submissions/:id/grade — guide grades a submission
router.patch(
  "/:id/grade",
  protect,
  requireRole("guide"),
  gradeSubmission
);

// GET /submissions/guide/:guideId — guide's grading queue
router.get(
  "/guide/:guideId",
  protect,
  requireRole("guide", "admin"),
  getSubmissionsByGuide
);

// GET /submissions/explorer/:explorerId — explorer's completed challenges
router.get(
  "/explorer/:explorerId",
  protect,
  requireRole("explorer", "admin"),
  getSubmissionsByExplorer
);

module.exports = router;