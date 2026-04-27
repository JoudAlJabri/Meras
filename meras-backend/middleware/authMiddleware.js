const jwt = require("jsonwebtoken");
const User = require("../models/User");

// protect — runs BEFORE any protected route handler

// It checks the request has a valid token in the header.
// If valid → attaches user info to req.user and moves on. -> req.user us what gives us any user info we need
// If invalid or missing → blocks the request with a 401 error.

const protect = async (req, res, next) => {  // the malware function
  let token;

  if (
    req.headers.authorization &&
    req.headers.authorization.startsWith("Bearer")
  ) 
  {
    try {

      // Get the token from authorization header , React should send Authorization: Bearer <token>
      // extract just the token part no bearer included 
      token = req.headers.authorization.split(" ")[1];

      // verify token using JWT_SECRET
      // this also check if token has expired
      const decoded = jwt.verify(token, process.env.JWT_SECRET);

      // decoded = { id: "...", role: "guide", iat: ..., exp: ... }

      req.user = await User.findById(decoded.id).select("-password");

      if (!req.user) {
        return res.status(401).json({ message: "User not found" });
      }


      // Move on to the actual route handler (e.g. getMe)
      next();
    } catch (error) {
      
      // jwt.verify throws if token is invalid or expired
      return res.status(401).json({ message: "Not authorized, token failed" });
    }
  }

  if (!token) {
    return res.status(401).json({ message: "Not authorized, no token" });
  }
};

module.exports = protect;