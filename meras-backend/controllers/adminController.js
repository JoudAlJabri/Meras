const User = require("../models/User");
const Announcement = require("../models/Announcement");
const FlaggedContent = require("../models/FlaggedContent");
// GET /api/admin/pending-guides
exports.getPendingGuides = async (req, res) => {
  try {
    const guides = await User.find({
      role: "guide",
      guideStatus: "pending",
    }).select("-password"); // don’t send passwords

    res.json(guides);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// PATCH /api/admin/guides/:id/approve
exports.approveGuide = async (req, res) => {
  try {
    const { id } = req.params;

    const guide = await User.findByIdAndUpdate(
      id,
      { guideStatus: "approved" },
      { new: true }
    ).select("-password");

    if (!guide) {
      return res.status(404).json({ message: "Guide not found" });
    }

    res.json({ message: "Guide approved", guide });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// PATCH /api/admin/guides/:id/reject
exports.rejectGuide = async (req, res) => {
  try {
    const { id } = req.params;

    const guide = await User.findByIdAndUpdate(
      id,
      { guideStatus: "rejected" },
      { new: true }
    ).select("-password");

    if (!guide) {
      return res.status(404).json({ message: "Guide not found" });
    }

    res.json({ message: "Guide rejected", guide });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// GET /api/admin/users
exports.getUsers = async (req, res) => {
  try {
    const { search, role, status } = req.query;

    const filter = {};

    if (role && role !== "All") {
      filter.role = role.toLowerCase();
    }

    if (status && status !== "All") {
      filter.status = status;
    }

    if (search) {
      filter.$or = [
        { name:  { $regex: search, $options: "i" } },
        { email: { $regex: search, $options: "i" } },
      ];
    }

    const users = await User.find(filter)
      .select("-password")
      .sort({ createdAt: -1 });

    res.status(200).json({ users });
  } catch (err) {
    console.error("getUsers error:", err.message);
    res.status(500).json({ message: "Server error" });
  }
};

// GET /api/admin/users/:id
exports.getUserById = async (req, res) => {
  try {
    const user = await User.findById(req.params.id).select("-password");

    if (!user) {
      return res.status(404).json({ message: "User not found" });
    }

    res.status(200).json({ user });
  } catch (err) {
    console.error("getUserById error:", err.message);
    res.status(500).json({ message: "Server error" });
  }
};

// PATCH /api/admin/users/:id/suspend
exports.suspendUser = async (req, res) => {
  try {
    const user = await User.findById(req.params.id);

    if (!user) {
      return res.status(404).json({ message: "User not found" });
    }

    if (user.status === "Suspended") {
      return res.status(400).json({ message: `${user.name} is already suspended` });
    }

    user.status = "Suspended";
    await user.save();

    res.status(200).json({ message: `${user.name} has been suspended`, user });
  } catch (err) {
    console.error("suspendUser error:", err.message);
    res.status(500).json({ message: "Server error" });
  }
};

// DELETE /api/admin/users/:id
exports.deleteUser = async (req, res) => {
  try {
    const user = await User.findById(req.params.id);

    if (!user) {
      return res.status(404).json({ message: "User not found" });
    }

    await user.deleteOne();

    res.status(200).json({ message: `${user.name} has been deleted` });
  } catch (err) {
    console.error("deleteUser error:", err.message);
    res.status(500).json({ message: "Server error" });
  }
};

// GET /api/admin/announcements
exports.getAnnouncements = async (req, res) => {
  try {
    const announcements = await Announcement.find()
      .sort({ createdAt: -1 });

    res.status(200).json({ announcements });
  } catch (err) {
    console.error("getAnnouncements error:", err.message);
    res.status(500).json({ message: "Server error" });
  }
};

// POST /api/admin/announcements
exports.createAnnouncement = async (req, res) => {
  try {
    const { title, message, targetAudience } = req.body;

    if (!title || !message) {
      return res.status(400).json({ message: "Title and message are required" });
    }

    const announcement = await Announcement.create({
      title,
      message,
      targetAudience: targetAudience || "All",
      status: "Published",
      createdBy: req.user.id,
    });

    res.status(201).json({ announcement });
  } catch (err) {
    console.error("createAnnouncement error:", err.message);
    res.status(500).json({ message: "Server error" });
  }
};

// DELETE /api/admin/announcements/:id
exports.deleteAnnouncement = async (req, res) => {
  try {
    const announcement = await Announcement.findById(req.params.id);

    if (!announcement) {
      return res.status(404).json({ message: "Announcement not found" });
    }

    await announcement.deleteOne();

    res.status(200).json({ message: "Announcement deleted" });
  } catch (err) {
    console.error("deleteAnnouncement error:", err.message);
    res.status(500).json({ message: "Server error" });
  }
};

// GET /api/admin/flagged-content
exports.getFlaggedContent = async (req, res) => {
  try {
    const flaggedItems = await FlaggedContent.find()
      .populate("reportedBy", "name email")
      .sort({ createdAt: -1 });

    res.status(200).json({ flaggedItems });
  } catch (err) {
    console.error("getFlaggedContent error:", err.message);
    res.status(500).json({ message: "Server error" });
  }
};

// PATCH /api/admin/flagged-content/:id/dismiss
exports.dismissFlag = async (req, res) => {
  try {
    const item = await FlaggedContent.findById(req.params.id);

    if (!item) {
      return res.status(404).json({ message: "Flagged content not found" });
    }

    item.status = "Dismissed";
    await item.save();

    res.status(200).json({ message: "Flag dismissed", item });
  } catch (err) {
    console.error("dismissFlag error:", err.message);
    res.status(500).json({ message: "Server error" });
  }
};

// PATCH /api/admin/flagged-content/:id/remove
exports.removeContent = async (req, res) => {
  try {
    const { removalAuditReason } = req.body;

    if (!removalAuditReason || !removalAuditReason.trim()) {
      return res.status(400).json({ message: "Removal reason is required for audit purposes" });
    }

    const item = await FlaggedContent.findById(req.params.id);

    if (!item) {
      return res.status(404).json({ message: "Flagged content not found" });
    }

    item.status = "Deleted";
    item.removalAuditReason = removalAuditReason.trim();
    await item.save();

    res.status(200).json({ message: "Content removed and warning notification sent to the user", item });
  } catch (err) {
    console.error("removeContent error:", err.message);
    res.status(500).json({ message: "Server error" });
  }
};