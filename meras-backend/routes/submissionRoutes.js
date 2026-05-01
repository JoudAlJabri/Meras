const express  = require("express");
const router   = express.Router();
const multer   = require("multer");
const path     = require("path");

const {
  createSubmission,
  gradeSubmission,
  getSubmissionsByGuide,
  getSubmissionsByExplorer,
  getSubmissionById,
} = require("../controllers/submissionController");

const { protect }  = require("../middleware/authMiddleware");
const requireRole  = require("../middleware/roleMiddleware");

// ── MULTER SETUP ──────────────────────────────
const storage = multer.diskStorage({
  destination: (req, file, cb) => {
    cb(null, "uploads/submissions/");
  },
  filename: (req, file, cb) => {
    cb(null, `${req.user.id}_${Date.now()}_${file.originalname}`);
  },
});
const upload = multer({ storage, limits: { fileSize: 10 * 1024 * 1024 } });

// ── ROUTES ────────────────────────────────────

router.post(
  "/",
  protect,
  requireRole("explorer"),
  upload.single("file"),
  createSubmission
);

router.patch(
  "/:id/grade",
  protect,
  requireRole("guide"),
  gradeSubmission
);

router.get(
  "/guide/:guideId",
  protect,
  requireRole("guide", "admin"),
  getSubmissionsByGuide
);

router.get(
  "/explorer/:explorerId",
  protect,
  requireRole("explorer", "admin"),
  getSubmissionsByExplorer
);

router.get(
  "/:id",
  protect,
  getSubmissionById
);

module.exports = router;
