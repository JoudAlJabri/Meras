const Challenge = require("../models/Challenge");

// GET /api/challenges
// Optional filters: ?major=...&difficulty=...
const getChallenges = async (req, res) => {
  try {
    const filter = {};

    if (req.query.major) {
      filter.major = req.query.major;
    }

    if (req.query.difficulty) {
      filter.difficulty = req.query.difficulty;
    }

    const challenges = await Challenge.find(filter);

    res.status(200).json(challenges);
  } catch (error) {
    res.status(500).json({ message: "Failed to fetch challenges" });
  }
};

// GET /api/challenges/:id
const getChallengeById = async (req, res) => {
  try {
    const challenge = await Challenge.findById(req.params.id);

    if (!challenge) {
      return res.status(404).json({ message: "Challenge not found" });
    }

    res.status(200).json(challenge);
  } catch (error) {
    res.status(500).json({ message: "Failed to fetch challenge" });
  }
};

module.exports = {
  getChallenges,
  getChallengeById,
};