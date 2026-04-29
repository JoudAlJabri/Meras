const Session = require("../models/Session");

// Create booking
exports.createSession = async (req, res) => {
  try {
    const session = await Session.create(req.body);
    res.status(201).json(session);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

//  Get sessions (with optional filtering)
exports.getSessions = async (req, res) => {
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