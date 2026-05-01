const User = require("../models/User");
const Announcement = require("../models/Announcement");
const FlaggedContent = require("../models/FlaggedContent");
const Challenge = require("../models/Challenge");
const Session = require("../models/Session");
const Taxonomy = require("../models/Taxonomy");

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


// GET /api/admin/dashboard
exports.getDashboardStats = async (req, res) => {
  try {
    // 4 stat cards
    const totalUsers = await User.countDocuments();

    const activeChallenges = await Challenge.countDocuments();

    const pendingVerifications = await User.countDocuments({
      role: "guide",
      guideStatus: "pending",
    });

    const totalSessions = await Session.countDocuments();

    // Recent sign-ups table — last 10 users
    const recentSignUps = await User.find()
      .select("-password")
      .sort({ createdAt: -1 })
      .limit(10);

    // User growth chart — count new users per month for current year
    const currentYear = new Date().getFullYear();

    const userGrowth = await User.aggregate([
      {
        $match: {
          createdAt: {
            $gte: new Date(`${currentYear}-01-01`),
            $lte: new Date(`${currentYear}-12-31`),
          },
        },
      },
      {
        $group: {
          _id: { $month: "$createdAt" },
          users: { $sum: 1 },
        },
      },
      { $sort: { _id: 1 } },
    ]);

    // Convert month numbers to names
    const monthNames = ["Jan","Feb","Mar","Apr","May","Jun","Jul","Aug","Sep","Oct","Nov","Dec"];

    const userGrowthData = monthNames.map((name, i) => {
      const found = userGrowth.find((m) => m._id === i + 1);
      return { name, users: found ? found.users : 0 };
    });

    res.status(200).json({
      stats: {
        totalUsers,
        activeChallenges,
        pendingVerifications,
        totalSessions,
      },
      recentSignUps,
      userGrowthData,
    });
  } catch (err) {
    console.error("getDashboardStats error:", err.message);
    res.status(500).json({ message: "Server error" });
  }
};

// helper — get or create the single taxonomy document
const getTaxonomyDoc = async () => {
  let taxonomy = await Taxonomy.findOne();
  if (!taxonomy) {
    taxonomy = await Taxonomy.create({ universities: [], majors: [] });
  }
  return taxonomy;
};

// GET /api/admin/taxonomy
exports.getTaxonomy = async (req, res) => {
  try {
    const taxonomy = await getTaxonomyDoc();
    res.status(200).json({
      universities: taxonomy.universities,
      majors: taxonomy.majors,
    });
  } catch (err) {
    console.error("getTaxonomy error:", err.message);
    res.status(500).json({ message: "Server error" });
  }
};

// POST /api/admin/taxonomy/universities
exports.addUniversity = async (req, res) => {
  try {
    const { name } = req.body;

    if (!name || !name.trim()) {
      return res.status(400).json({ message: "University name is required" });
    }

    const taxonomy = await getTaxonomyDoc();

    const already = taxonomy.universities.some(
      (u) => u.toLowerCase() === name.trim().toLowerCase()
    );
    if (already) {
      return res.status(400).json({ message: "University already exists" });
    }

    taxonomy.universities.push(name.trim());
    await taxonomy.save();

    res.status(201).json({
      message: `${name.trim()} has been added`,
      universities: taxonomy.universities,
    });
  } catch (err) {
    console.error("addUniversity error:", err.message);
    res.status(500).json({ message: "Server error" });
  }
};

// DELETE /api/admin/taxonomy/universities/:name
exports.deleteUniversity = async (req, res) => {
  try {
    const name = decodeURIComponent(req.params.name);
    const taxonomy = await getTaxonomyDoc();

    const before = taxonomy.universities.length;
    taxonomy.universities = taxonomy.universities.filter(
      (u) => u.toLowerCase() !== name.toLowerCase()
    );

    if (taxonomy.universities.length === before) {
      return res.status(404).json({ message: "University not found" });
    }

    await taxonomy.save();

    res.status(200).json({
      message: `${name} has been deleted`,
      universities: taxonomy.universities,
    });
  } catch (err) {
    console.error("deleteUniversity error:", err.message);
    res.status(500).json({ message: "Server error" });
  }
};

// POST /api/admin/taxonomy/majors
exports.addMajor = async (req, res) => {
  try {
    const { name } = req.body;

    if (!name || !name.trim()) {
      return res.status(400).json({ message: "Major name is required" });
    }

    const taxonomy = await getTaxonomyDoc();

    const already = taxonomy.majors.some(
      (m) => m.toLowerCase() === name.trim().toLowerCase()
    );
    if (already) {
      return res.status(400).json({ message: "This major already exists in the database" });
    }

    taxonomy.majors.push(name.trim());
    await taxonomy.save();

    res.status(201).json({
      message: "New major added to system catalog",
      majors: taxonomy.majors,
    });
  } catch (err) {
    console.error("addMajor error:", err.message);
    res.status(500).json({ message: "Server error" });
  }
};

// DELETE /api/admin/taxonomy/majors/:name
exports.deleteMajor = async (req, res) => {
  try {
    const name = decodeURIComponent(req.params.name);
    const taxonomy = await getTaxonomyDoc();

    const before = taxonomy.majors.length;
    taxonomy.majors = taxonomy.majors.filter(
      (m) => m.toLowerCase() !== name.toLowerCase()
    );

    if (taxonomy.majors.length === before) {
      return res.status(404).json({ message: "Major not found" });
    }

    await taxonomy.save();

    res.status(200).json({
      message: `${name} has been deleted`,
      majors: taxonomy.majors,
    });
  } catch (err) {
    console.error("deleteMajor error:", err.message);
    res.status(500).json({ message: "Server error" });
  }
};