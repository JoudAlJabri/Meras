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

router.get("/", sessionController.getSessions);

module.exports = router;