const Session = require("../models/Session");
const User = require("../models/User");

/*// Create booking
exports.createSession = async (req, res) => {
  exports.createSession = async (req, res) => {
  try {
    const session = await Session.create(req.body);
    res.status(201).json(session);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};
};*/

//  Get sessions (with optional filtering)
const getSessions = async (req, res) => {
    try {
    const { email, role } = req.query;

    let query = {};

    if (email && role === "explorer") {
      query.explorerEmail = email;
    } else if (email && role === "mentor") {
      query.mentorEmail = email;
    }

    const sessions = await Session.find(query);
    res.json(sessions);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};


const createSession = async (req, res) => {
  try {
    const { mentorEmail, slot, topic } = req.body;

    if (!mentorEmail || !slot || !topic) {
      return res.status(400).json({ message: "All fields are required" });
    }

    // Check if slot already taken for this mentor
    const existing = await Session.findOne({
      mentorEmail,
      slot: new Date(slot),
    });

    if (existing) {
      return res.status(400).json({ message: "This time slot is already booked" });
    }

    const booking = await Session.create({
      mentorEmail,
      explorerEmail: req.user.email,
      slot,
      topic,
    });

    // Track session on the explorer's profile
    await User.findByIdAndUpdate(req.user.id, {
      $push: { sessionsBooked: booking._id },
    });

    res.status(201).json({ booking });
  } catch (err) {
    console.error("createBooking error:", err.message);
    res.status(500).json({ message: "Server error" });
  }
};

// GET /sessions/mine — guide or explorer gets their own sessions
const getMySessions = async (req, res) => {
  try {
    const query =
      req.user.role === "guide"
        ? { mentorEmail: req.user.email }
        : { explorerEmail: req.user.email };

    const sessions = await Session.find(query).sort({ slot: 1 });
    res.status(200).json({ sessions });
  } catch (err) {
    console.error("getMySessions error:", err.message);
    res.status(500).json({ message: "Server error" });
  }
};

// PATCH /sessions/:id/status — guide updates session status
const updateSessionStatus = async (req, res) => {
  try {
    const { status } = req.body;
    const allowed = ["confirmed", "completed", "cancelled"];

    if (!allowed.includes(status)) {
      return res.status(400).json({ message: `Status must be one of: ${allowed.join(", ")}` });
    }

    const session = await Session.findById(req.params.id);
    if (!session) return res.status(404).json({ message: "Session not found" });

    if (session.mentorEmail !== req.user.email) {
      return res.status(403).json({ message: "Not authorized to update this session" });
    }

    session.status = status;
    await session.save();

    res.status(200).json({ session });
  } catch (err) {
    console.error("updateSessionStatus error:", err.message);
    res.status(500).json({ message: "Server error" });
  }
};

module.exports = { createSession, getSessions, getMySessions, updateSessionStatus };