const express = require("express");
const router = express.Router();

const adminController = require("../controllers/adminController");
const protect = require("../middleware/authMiddleware");
const requireRole = require("../middleware/roleMiddleware");

// existing routes
router.get("/pending-guides", protect, requireRole("admin"), adminController.getPendingGuides);
router.patch("/guides/:id/approve", protect, requireRole("admin"), adminController.approveGuide);
router.patch("/guides/:id/reject", protect, requireRole("admin"), adminController.rejectGuide);

// new user directory routes
router.get("/users", protect, requireRole("admin"), adminController.getUsers);
router.get("/users/:id", protect, requireRole("admin"), adminController.getUserById);
router.patch("/users/:id/suspend", protect, requireRole("admin"), adminController.suspendUser);
router.delete("/users/:id", protect, requireRole("admin"), adminController.deleteUser);

// announcement routes
router.get("/announcements",      protect, requireRole("admin"), adminController.getAnnouncements);
router.post("/announcements",     protect, requireRole("admin"), adminController.createAnnouncement);
router.delete("/announcements/:id", protect, requireRole("admin"), adminController.deleteAnnouncement);

module.exports = router;