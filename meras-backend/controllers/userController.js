const User = require("../models/User");
const Session = require("../models/Session");
const Challenge = require("../models/Challenge");

// POST /users/:id/quiz-results
// Explorer only — save Compass Quiz results

const saveQuizResults = async (req, res) => {
  try {
    const { recommendedMajors } = req.body;

    if (!recommendedMajors || !Array.isArray(recommendedMajors)) {
      return res.status(400).json({ message: "recommendedMajors must be an array" });
    }

    if (req.params.id !== req.user.id.toString()) {
      return res.status(403).json({ message: "Not authorized" });
    }

    const user = await User.findByIdAndUpdate(
      req.params.id,
      { recommendedMajors },
      { new: true }
    ).select("-password");

    res.status(200).json({ user });
  } catch (err) {
    console.error("saveQuizResults error:", err.message);
    res.status(500).json({ message: "Server error" });
  }
};

// GET /users/me/saved-challenges — returns explorer's saved challenges (populated)

const getSavedChallenges = async (req, res) => {
  try {
    const user = await User.findById(req.user.id).populate("savedChallenges");
    res.status(200).json({ savedChallenges: user.savedChallenges });
  } catch (err) {
    console.error("getSavedChallenges error:", err.message);
    res.status(500).json({ message: "Server error" });
  }
};

// PATCH /users/me/settings — explorer updates their own profile
const updateExplorerSettings = async (req, res) => {
  try {
    const user = await User.findById(req.user.id);
    if (!user) return res.status(404).json({ message: "User not found" });

    const { firstName, lastName, grade, currentPassword, newPassword } = req.body;

    if (firstName || lastName) {
      const [existingFirst = "", existingLast = ""] = user.name.split(" ");
      const updatedFirst = firstName?.trim() || existingFirst;
      const updatedLast = lastName?.trim() || existingLast;
      user.name = `${updatedFirst} ${updatedLast}`.trim();
    }

    if (grade) {
      const validGrades = ["Grade 10", "Grade 11", "Grade 12"];
      if (!validGrades.includes(grade)) {
        return res.status(400).json({ message: "Invalid grade. Must be Grade 10, Grade 11, or Grade 12" });
      }
      user.grade = grade;
    }

    if (newPassword) {
      if (!currentPassword) {
        return res.status(400).json({ message: "Current password is required to set a new password" });
      }
      const isMatch = await user.matchPassword(currentPassword);
      if (!isMatch) {
        return res.status(401).json({ message: "Current password is incorrect" });
      }
      user.password = newPassword;
    }

    if (req.file) {
      user.profilePhoto = req.file.path;
    }

    await user.save();

    const updated = await User.findById(user._id).select("-password");
    res.status(200).json({ user: updated });
  } catch (err) {
    console.error("updateExplorerSettings error:", err.message);
    res.status(500).json({ message: "Server error" });
  }
};

// PATCH /users/me/guide-settings — guide updates their own profile
const updateGuideSettings = async (req, res) => {
  try {
    const user = await User.findById(req.user.id);
    if (!user) return res.status(404).json({ message: "User not found" });

    const { firstName, lastName, major, about, skills, currentPassword, newPassword } = req.body;

    if (firstName || lastName) {
      const [existingFirst = "", existingLast = ""] = user.name.split(" ");
      const updatedFirst = firstName?.trim() || existingFirst;
      const updatedLast = lastName?.trim() || existingLast;
      user.name = `${updatedFirst} ${updatedLast}`.trim();
    }

    if (major !== undefined) user.major = major;
    if (about !== undefined) user.about = about;

    if (skills !== undefined) {
      try {
        user.skills = typeof skills === "string" ? JSON.parse(skills) : skills;
      } catch {
        return res.status(400).json({ message: "Invalid skills format" });
      }
    }

    if (newPassword) {
      if (!currentPassword) {
        return res.status(400).json({ message: "Current password is required to set a new password" });
      }
      const isMatch = await user.matchPassword(currentPassword);
      if (!isMatch) {
        return res.status(401).json({ message: "Current password is incorrect" });
      }
      user.password = newPassword;
    }

    if (req.file) {
      user.profilePhoto = req.file.path;
    }

    await user.save();

    const updated = await User.findById(user._id).select("-password");
    res.status(200).json({ user: updated });
  } catch (err) {
    console.error("updateGuideSettings error:", err.message);
    res.status(500).json({ message: "Server error" });
  }
};

// GET /users/me/dashboard — explorer dashboard summary
const getDashboard = async (req, res) => {
  try {
    const user = await User.findById(req.user.id)
      .populate("completedChallenges", "title")
      .populate("challengesInProgress", "title major")
      .populate("sessionsBooked");

    if (!user) return res.status(404).json({ message: "User not found" });

    const firstName = user.name.split(" ")[0];

    const recentActivity = [];

    if (user.completedChallenges.length > 0) {
      const last = user.completedChallenges[user.completedChallenges.length - 1];
      recentActivity.push({
        type: "challenge",
        label: "Challenges",
        detail: `Completed '${last.title}'`,
      });
    }

    if (user.sessionsBooked.length > 0) {
      const lastSession = user.sessionsBooked[user.sessionsBooked.length - 1];
      const guide = await User.findOne({ email: lastSession.mentorEmail }).select("name");
      recentActivity.push({
        type: "session",
        label: "Bookings",
        detail: `Booked a session with ${guide?.name || lastSession.mentorEmail}`,
      });
    }

    res.status(200).json({
      firstName,
      stats: {
        completedChallenges: user.completedChallenges.length,
        challengesInProgress: user.challengesInProgress.length,
        sessionsBooked: user.sessionsBooked.length,
        savedChallenges: user.savedChallenges.length,
      },
      challengesInProgress: user.challengesInProgress,
      recentActivity,
    });
  } catch (err) {
    console.error("getDashboard error:", err.message);
    res.status(500).json({ message: "Server error" });
  }
};

// GET /api/mentors
// Public — all approved guides with optional ?major= and ?university= filters
const getMentors = async (req, res) => {
  try {
    const filter = { role: "guide", guideStatus: "approved" };

    if (req.query.major)      filter.major      = req.query.major;
    if (req.query.university) filter.university = req.query.university;

    const mentors = await User.find(filter)
      .select("-password")
      .sort({ createdAt: -1 });

    res.status(200).json({ mentors });
  } catch (err) {
    console.error("getMentors error:", err.message);
    res.status(500).json({ message: "Server error" });
  }
};

// GET /api/mentors/:id
// Public — single mentor profile with their published challenges
const getMentorById = async (req, res) => {
  try {
    const mentor = await User.findOne({
      _id: req.params.id,
      role: "guide",
      status: "Active",
      guideStatus: "approved",
    }).select("-password");

    if (!mentor) {
      return res.status(404).json({ message: "Mentor not found" });
    }

    const challenges = await Challenge.find({ mentorId: req.params.id })
      .sort({ createdAt: -1 });

    res.status(200).json({ mentor, challenges });
  } catch (err) {
    console.error("getMentorById error:", err.message);
    res.status(500).json({ message: "Server error" });
  }
};

// PUT /api/users/:id/availability
// Guide only — save weekly slot schedule
const updateAvailability = async (req, res) => {
  try {
    const { availability } = req.body;

    if (!availability || !Array.isArray(availability)) {
      return res.status(400).json({ message: "availability must be an array" });
    }

    if (req.params.id !== req.user.id.toString()) {
      return res.status(403).json({ message: "Not authorized" });
    }

    const user = await User.findByIdAndUpdate(
      req.params.id,
      { availability },
      { new: true }
    ).select("-password");

    res.status(200).json({ user });
  } catch (err) {
    console.error("updateAvailability error:", err.message);
    res.status(500).json({ message: "Server error" });
  }
};

module.exports = {
  saveQuizResults,
  getSavedChallenges,
  updateExplorerSettings,
  updateGuideSettings,
  getDashboard,
  getMentors,
  getMentorById,
  updateAvailability,
};