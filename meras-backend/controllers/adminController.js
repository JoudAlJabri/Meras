const User = require("../models/User");

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
