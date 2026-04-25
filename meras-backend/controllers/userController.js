const User = require("../models/User");

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

module.exports = { saveQuizResults };
