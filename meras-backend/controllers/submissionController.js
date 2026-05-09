const Submission = require("../models/Submission");
const Challenge = require("../models/Challenge");
const User = require("../models/User");

// POST /submissions
// Explorer submits their work
const createSubmission = async (req, res) => {
  try {
    const { challengeId, submissionType, textAnswer, canvasBase64 } = req.body;

    // Find the challenge to get the guideId
    const challenge = await Challenge.findById(challengeId);
    if (!challenge) {
      return res.status(404).json({ message: "Challenge not found" });
    }

    let fileUrl = "";
    let canvasUrl = "";

    if (submissionType === "file") {
      if (!req.file) {
        return res.status(400).json({ message: "No file uploaded" });
      }
      const b64 = req.file.buffer.toString("base64");
      fileUrl = `data:${req.file.mimetype};base64,${b64}`;
    }

    if (submissionType === "canvas") {
      if (!canvasBase64) {
        return res.status(400).json({ message: "canvasBase64 is required for canvas submissions" });
      }
      canvasUrl = canvasBase64;
    }

    const submission = await Submission.create({
      challengeId,
      explorerId:     req.user.id,
      guideId:        challenge.mentorId,
      submissionType,
      fileUrl,
      textAnswer:     textAnswer || "",
      canvasUrl,
    });

    await User.findByIdAndUpdate(req.user.id, {
      $addToSet: { completedChallenges: challengeId },
      $pull:     { challengesInProgress: challengeId },
    });

    res.status(201).json({ submission });
  } catch (err) {
    console.error("createSubmission error:", err.message);
    res.status(500).json({ message: "Server error" });
  }
};

// PATCH /submissions/:id/grade
// Guide only — set stars + feedback

const gradeSubmission = async (req, res) => {
  try {
    const { stars, feedback } = req.body;

    // Validate stars
    if (!stars || stars < 1 || stars > 5) {
      return res.status(400).json({ message: "Stars must be between 1 and 5" });
    }

    const submission = await Submission.findById(req.params.id);
    if (!submission) {
      return res.status(404).json({ message: "Submission not found" });
    }

    // Make sure this guide owns the challenge the submission is for
    if (submission.guideId.toString() !== req.user.id) {
      return res.status(403).json({ message: "Not authorized to grade this submission" });
    }

    // Update just these 3 fields — everything else stays the same
    submission.stars    = stars;
    submission.feedback = feedback || "";
    submission.status   = "graded";
    await submission.save();

    res.status(200).json({ submission });
  } catch (err) {
    console.error("gradeSubmission error:", err.message);
    res.status(500).json({ message: "Server error" });
  }
};

// GET /submissions/guide/:guideId
// Guide's grading queue

const getSubmissionsByGuide = async (req, res) => {
  try {
    if (req.user.role !== "admin" && req.params.guideId !== req.user.id) {
      return res.status(403).json({ message: "Not authorized" });
    }

    const submissions = await Submission.find({ guideId: req.params.guideId })
      .populate("challengeId", "title description")   // pulls in challenge title + major
      .populate("explorerId", "name email")     // pulls in explorer name + email
      .sort({ createdAt: -1 });

    res.status(200).json({ submissions });
  } catch (err) {
    console.error("getSubmissionsByGuide error:", err.message);
    res.status(500).json({ message: "Server error" });
  }
};

// GET /submissions/explorer/:explorerId
// Explorer's completed challenges

const getSubmissionsByExplorer = async (req, res) => {
  try {
    if (req.user.role !== "admin" && req.params.explorerId !== req.user.id) {
      return res.status(403).json({ message: "Not authorized" });
    }

    const submissions = await Submission.find({ explorerId: req.params.explorerId })
      .populate("challengeId", "title major description")
      .sort({ createdAt: -1 });

    res.status(200).json({ submissions });
  } catch (err) {
    console.error("getSubmissionsByExplorer error:", err.message);
    res.status(500).json({ message: "Server error" });
  }
};

// Get a single submission by ID
const getSubmissionById = async (req, res) => {
  try {
    const submission = await Submission.findById(req.params.id)
      .populate("challengeId", "title description")
      .populate("explorerId", "name email");

    if (!submission) {
      return res.status(404).json({ message: "Submission not found" });
    }

    res.status(200).json({ submission });
  } catch (err) {
    console.error("getSubmissionById error:", err.message);
    res.status(500).json({ message: "Server error" });
  }
};

module.exports = {
  createSubmission,
  gradeSubmission,
  getSubmissionsByGuide,
  getSubmissionsByExplorer,
  getSubmissionById,
};