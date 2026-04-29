const express = require("express");
const router = express.Router();

const adminController = require("../controllers/adminController");
const protect = require("../middleware/authMiddleware");
const requireRole = require("../middleware/roleMiddleware");

router.get("/pending-guides", protect, requireRole("admin"), adminController.getPendingGuides);
router.patch("/guides/:id/approve", protect, requireRole("admin"), adminController.approveGuide);
router.patch("/guides/:id/reject", protect, requireRole("admin"), adminController.rejectGuide);

module.exports = router;