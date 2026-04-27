const Challenge = require("../models/Challenge");
const User = require("../models/User"); // needed for guide name lookup in createChallenge

// GET /challenges
// Public — anyone can browse the catalog
// Supports ?major= and ?difficulty= filters 
// ⬆️  Instead of building separate routes for each case, use 
// query parameters — extra info added to the end of a URL after a ?.

const getChallenges = async (req, res) => {
  try {
    const filter = {};

    // If ?major=Computer Science is in the URL, add it to the filter
    if (req.query.major)      filter.major = req.query.major;
    if (req.query.difficulty) filter.difficulty = req.query.difficulty;

    const challenges = await Challenge.find(filter).sort({ createdAt: -1 });
    res.status(200).json({ challenges });
  } catch (err) {
    console.error("getChallenges error:", err.message);
    res.status(500).json({ message: "Server error" });
  }
};

// GET /challenges/:id
// Public — challenge detail/overview page

const getChallengeById = async (req, res) => {
  try {
    const challenge = await Challenge.findById(req.params.id);

    if (!challenge) {
      return res.status(404).json({ message: "Challenge not found" });
    }

    res.status(200).json({ challenge });
  } catch (err) {
    console.error("getChallengeById error:", err.message);
    res.status(500).json({ message: "Server error" });
  }
};

// GET /challenges/guide/:guideId
// Guide only — their own published challenges

const getChallengesByGuide = async (req, res) => {
  try {
    const challenges = await Challenge.find({ mentorId: req.params.guideId }).sort({ createdAt: -1 });
    res.status(200).json({ challenges });
  } catch (err) {
    console.error("getChallengesByGuide error:", err.message);
    res.status(500).json({ message: "Server error" });
  }
};

// POST /challenges
// Guide only — Task Wizard publish

const createChallenge = async (req, res) => {
  try {
    const {
      title,
      major,
      tags,
      description,
      difficulty,
      timeEstimate,
      whatYouWillLearn,
      whatYouWillDo,
      whatYouWillNeed,
      instructions,
      referenceLinks,
      downloadableFiles,
    } = req.body;

    // Basic validation
    if (!title || !major || !description || !difficulty || !timeEstimate || !whatYouWillDo || !whatYouWillLearn || !whatYouWillNeed || !instructions) {
      return res.status(400).json({ message: "title, major, description, difficulty, timeEstimate, whatYouWillDo,  whatYouWillLearn, whatYouWillNeed, and instructions are required" });
    }

    // Get the guide's name from their user document
    const guide = await User.findById(req.user.id);

    const challenge = await Challenge.create({
      title,
      major,
      mentorId:   req.user.id,   // from the JWT token (set by protect middleware)
      mentorName: guide.name,
      tags:       tags || [],
      description,
      difficulty,
      timeEstimate,
      whatYouWillLearn:  whatYouWillLearn  || [],
      whatYouWillDo:     whatYouWillDo     || [],
      whatYouWillNeed:   whatYouWillNeed   || [],
      instructions:      instructions      || "",
      referenceLinks:    referenceLinks    || [],
      downloadableFiles: downloadableFiles || [],
    });

    res.status(201).json({ challenge });
  } catch (err) {
    console.error("createChallenge error:", err.message);
    res.status(500).json({ message: "Server error" });
  }
};

// PUT /challenges/:id
// Guide only — edit their own challenge
const updateChallenge = async (req, res) => {
  try {
    const challenge = await Challenge.findById(req.params.id);

    if (!challenge) {
      return res.status(404).json({ message: "Challenge not found" });
    }

    // Make sure the guide owns this challenge (can't edit someone else's)
    if (challenge.mentorId.toString() !== req.user.id) {
      return res.status(403).json({ message: "Not authorized to edit this challenge" });
    }

    // Update it with whatever fields were sent in the body
    const updated = await Challenge.findByIdAndUpdate(
      req.params.id,
      req.body,
      { new: true } // return the updated document, not the old one
    );

    res.status(200).json({ challenge: updated });
  } catch (err) {
    console.error("updateChallenge error:", err.message);
    res.status(500).json({ message: "Server error" });
  }
};

// DELETE /challenges/:id
// Guide or Admin — delete a challenge

const deleteChallenge = async (req, res) => {
  try {
    const challenge = await Challenge.findById(req.params.id);

    if (!challenge) {
      return res.status(404).json({ message: "Challenge not found" });
    }

    // Guides can only delete their own — admins can delete any
    if (
      req.user.role !== "admin" &&
      challenge.mentorId.toString() !== req.user.id
    ) {
      return res.status(403).json({ message: "Not authorized to delete this challenge" });
    }

    await challenge.deleteOne();
    res.status(200).json({ message: "Challenge deleted successfully" });
  } catch (err) {
    console.error("deleteChallenge error:", err.message);
    res.status(500).json({ message: "Server error" });
  }
};

// POST /challenges/:id/complete — explorer marks a challenge as done

const completeChallenge = async (req, res) => {
  try {
    const user = await User.findById(req.user.id);
    if (user.completedChallenges.map(id => id.toString()).includes(req.params.id)) {
      return res.status(400).json({ message: "Challenge already marked as completed" });
    }

    await User.findByIdAndUpdate(req.user.id, {
      $addToSet: { completedChallenges: req.params.id },
    });

    res.status(200).json({ message: "Challenge marked as completed" });
  } catch (err) {
    console.error("completeChallenge error:", err.message);
    res.status(500).json({ message: "Server error" });
  }
};

// POST /challenges/:id/save — explorer bookmarks a challenge

const saveChallenge = async (req, res) => {
  try {
    await User.findByIdAndUpdate(req.user.id, {
      $addToSet: { savedChallenges: req.params.id },
    });
    res.status(200).json({ message: "Challenge saved" });
  } catch (err) {
    console.error("saveChallenge error:", err.message);
    res.status(500).json({ message: "Server error" });
  }
};

// DELETE /challenges/:id/save — explorer removes a bookmark

const unsaveChallenge = async (req, res) => {
  try {
    await User.findByIdAndUpdate(req.user.id, {
      $pull: { savedChallenges: req.params.id },
    });
    res.status(200).json({ message: "Challenge removed from saved" });
  } catch (err) {
    console.error("unsaveChallenge error:", err.message);
    res.status(500).json({ message: "Server error" });
  }
};

module.exports = {
  getChallenges,
  getChallengeById,
  getChallengesByGuide,
  createChallenge,
  updateChallenge,
  deleteChallenge,
  completeChallenge,
  saveChallenge,
  unsaveChallenge,
};