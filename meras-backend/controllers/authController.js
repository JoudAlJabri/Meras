const crypto = require("crypto");
const jwt = require("jsonwebtoken");
const User = require("../models/User");
const sendEmail = require("../utils/sendEmail");

const generateToken = (user) => {
  return jwt.sign(
    { id: user._id, role: user.role },
    process.env.JWT_SECRET,
    { expiresIn: "7d" }
  );
};

const generateVerificationEmail = (name, token) => {
  const link = `http://localhost:5001/api/auth/verify-email/${token}`;
  return {
    subject: "Verify your Meras account",
    html: `
      <h2>Welcome to Meras, ${name}!</h2>
      <p>Please verify your email address by clicking the link below. This link expires in 24 hours.</p>
      <a href="${link}" style="background:#4F46E5;color:white;padding:10px 20px;border-radius:6px;text-decoration:none;">Verify Email</a>
      <p>Or copy this link: ${link}</p>
    `,
  };
};

// POST /auth/register

const register = async (req, res) => {
  try {
    const { name, email, password, role, gender, grade, university, major, transcript } = req.body;

    // Check shared required fields
    if (!name || !email || !password || !role) {
      return res.status(400).json({ message: "All fields are required" });
    }

    // Check role-specific required fields
    if (role === "explorer" && (!gender || !grade)) {
      return res.status(400).json({ message: "Gender and grade are required for explorers" });
    }
    if (role === "guide" && (!university || !major)) {
      return res.status(400).json({ message: "University and major are required for guides" });
    }

    // Check if email is already registered
    const existingUser = await User.findOne({ email });
    if (existingUser) {
      return res.status(409).json({ message: "Email already in use" });
    }

    // Generate verification token
    const verificationToken = crypto.randomBytes(32).toString("hex");

    // Save user — pre-save hook handles password hashing
    const user = await User.create({
      name,
      email,
      password,
      role,
      ...(role === "explorer" && { gender, grade }),
      ...(role === "guide" && { university, major, ...(transcript && { transcript }) }),
      emailVerificationToken: verificationToken,
      emailVerificationExpires: new Date(Date.now() + 24 * 60 * 60 * 1000), // 24 hours
    });

    // Send verification email
    const { subject, html } = generateVerificationEmail(name, verificationToken);
    await sendEmail({ to: email, subject, html });

    res.status(201).json({
      message: "Account created. Please check your email to verify your account before logging in.",
      user: {
        id: user._id,
        name: user.name,
        email: user.email,
        role: user.role,
        guideStatus: user.guideStatus,
      },
    });
  } catch (err) {
    console.error("Register error:", err.message);
    res.status(500).json({ message: "Server error" });
  }
};

// POST /auth/login

const login = async (req, res) => {
  try {
    const { email, password } = req.body;

    if (!email || !password) {
      return res.status(400).json({ message: "Email and password are required" });
    }

    const user = await User.findOne({ email });
    if (!user) {
      return res.status(401).json({ message: "Invalid email or password" });
    }

    const isMatch = await user.matchPassword(password);
    if (!isMatch) {
      return res.status(401).json({ message: "Invalid email or password" });
    }

    // Block unverified users
    if (!user.emailVerified) {
      return res.status(403).json({ message: "Please verify your email before logging in." });
    }

    const token = generateToken(user);

    res.status(200).json({
      token,
      user: {
        id: user._id,
        name: user.name,
        email: user.email,
        role: user.role,
        guideStatus: user.guideStatus,
      },
    });
  } catch (err) {
    console.error("Login error:", err.message);
    res.status(500).json({ message: "Server error" });
  }
};

// GET /auth/verify-email/:token

const verifyEmail = async (req, res) => {
  try {
    const { token } = req.params;

    const user = await User.findOne({
      emailVerificationToken: token,
      emailVerificationExpires: { $gt: new Date() },
    });

    if (!user) {
      return res.status(400).json({ message: "Invalid or expired verification link." });
    }

    user.emailVerified = true;
    user.emailVerificationToken = undefined;
    user.emailVerificationExpires = undefined;
    await user.save();

    res.status(200).json({ message: "Email verified successfully. You can now log in." });
  } catch (err) {
    console.error("VerifyEmail error:", err.message);
    res.status(500).json({ message: "Server error" });
  }
};

// POST /auth/resend-verification

const resendVerification = async (req, res) => {
  try {
    const { email } = req.body;

    if (!email) {
      return res.status(400).json({ message: "Email is required" });
    }

    const user = await User.findOne({ email });
    if (!user) {
      return res.status(404).json({ message: "No account found with that email" });
    }

    if (user.emailVerified) {
      return res.status(400).json({ message: "This account is already verified" });
    }

    const verificationToken = crypto.randomBytes(32).toString("hex");
    user.emailVerificationToken = verificationToken;
    user.emailVerificationExpires = new Date(Date.now() + 24 * 60 * 60 * 1000);
    await user.save();

    const { subject, html } = generateVerificationEmail(user.name, verificationToken);
    await sendEmail({ to: email, subject, html });

    res.status(200).json({ message: "Verification email resent. Please check your inbox." });
  } catch (err) {
    console.error("ResendVerification error:", err.message);
    res.status(500).json({ message: "Server error" });
  }
};

// GET /auth/me — protect middleware runs first

const getMe = async (req, res) => {
  try {
    const user = await User.findById(req.user.id).select("-password");

    if (!user) {
      return res.status(404).json({ message: "User not found" });
    }

    res.status(200).json({ user });
  } catch (err) {
    console.error("GetMe error:", err.message);
    res.status(500).json({ message: "Server error" });
  }
};

module.exports = { register, login, verifyEmail, resendVerification, getMe };
