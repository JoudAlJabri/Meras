const express = require("express");
const router = express.Router();

const adminController = require("../controllers/adminController");
const protect = require("../middleware/authMiddleware");
const requireRole = require("../middleware/roleMiddleware");

// dashboard
router.get("/dashboard", protect, requireRole("admin"), adminController.getDashboardStats);
// verifying routes
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

// flagged content routes
router.get("/flagged-content",              protect, requireRole("admin"), adminController.getFlaggedContent);
router.patch("/flagged-content/:id/dismiss", protect, requireRole("admin"), adminController.dismissFlag);
router.patch("/flagged-content/:id/remove",  protect, requireRole("admin"), adminController.removeContent);
// explorer submits a report — any logged-in user
router.post("/flagged-content", protect, adminController.createFlaggedContent);
module.exports = router;

// taxonomy routes
router.get("/taxonomy",                          protect, requireRole("admin"), adminController.getTaxonomy);
router.post("/taxonomy/universities",            protect, requireRole("admin"), adminController.addUniversity);
router.delete("/taxonomy/universities/:name",    protect, requireRole("admin"), adminController.deleteUniversity);
router.post("/taxonomy/majors",                  protect, requireRole("admin"), adminController.addMajor);
router.delete("/taxonomy/majors/:name",          protect, requireRole("admin"), adminController.deleteMajor);

// office hours
router.get("/office-hours",  protect, requireRole("admin"), adminController.getOfficeHours);
router.post("/office-hours", protect, requireRole("admin"), adminController.saveOfficeHours);