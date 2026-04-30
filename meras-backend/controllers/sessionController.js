const Session = require("../models/Session");

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
      explorerEmail: req.user.email, // from token
      slot,
      topic,
    });

    res.status(201).json({ booking });
  } catch (err) {
    console.error("createBooking error:", err.message);
    res.status(500).json({ message: "Server error" });
  }
};

module.exports = { createSession, getSessions };