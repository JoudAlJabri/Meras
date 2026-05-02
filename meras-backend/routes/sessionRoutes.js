const express = require("express");
const router = express.Router();
const protect = require("../middleware/authMiddleware");
const requireRole = require("../middleware/roleMiddleware");
const sessionController = require("../controllers/sessionController");

router.post(
  "/",
  protect,
  requireRole("explorer"),
  sessionController.createSession
);

router.patch("/:id/cancel", protect, requireRole("explorer"), sessionController.cancelSession);

// must be before /:id to avoid route conflict
router.get("/mine", protect, sessionController.getMySessions);

router.get("/", protect, sessionController.getSessions);

router.patch("/:id/status", protect, requireRole("guide"), sessionController.updateSessionStatus);

module.exports = router;