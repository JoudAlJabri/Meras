const User = require("../models/User");
const Session = require("../models/Session");

// POST /users/:id/quiz-results
// Explorer only — save Compass Quiz results

const saveQuizResults = async (req, res) => {
  try {
    const { recommendedMajors } = req.body;

    if (!recommendedMajors || !Array.isArray(recommendedMajors)) {
      return res.status(400).json({ message: "recommendedMajors must be an array" });
    }

    // Explorer can only update their own quiz results
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

    // Name update — split existing name to fill missing half
    if (firstName || lastName) {
      const [existingFirst = "", existingLast = ""] = user.name.split(" ");
      const updatedFirst = firstName?.trim() || existingFirst;
      const updatedLast = lastName?.trim() || existingLast;
      user.name = `${updatedFirst} ${updatedLast}`.trim();
    }

    // Grade update
    if (grade) {
      const validGrades = ["Grade 10", "Grade 11", "Grade 12"];
      if (!validGrades.includes(grade)) {
        return res.status(400).json({ message: "Invalid grade. Must be Grade 10, Grade 11, or Grade 12" });
      }
      user.grade = grade;
    }

    // Password update — requires current password verification
    if (newPassword) {
      if (!currentPassword) {
        return res.status(400).json({ message: "Current password is required to set a new password" });
      }
      const isMatch = await user.matchPassword(currentPassword);
      if (!isMatch) {
        return res.status(401).json({ message: "Current password is incorrect" });
      }
      user.password = newPassword; // pre-save hook will hash it
    }

    // Profile image update
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

    // Build recent activity from last completed challenge + last booked session
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

module.exports = { saveQuizResults, getSavedChallenges, updateExplorerSettings, updateGuideSettings, getDashboard };
