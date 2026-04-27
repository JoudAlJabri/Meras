const express = require("express");  // importing express
const router = express.Router();  // using the router from express

const { register, login, verifyEmail, resendVerification, getMe } = require("../controllers/authController");
const protect = require("../middleware/authMiddleware");  // to check if the users token is still valid

// POST /auth/register  → anyone can hit this (no token needed)
router.post("/register", register);

// POST /auth/login     → anyone can hit this (no token needed)
router.post("/login", login);

 
// GET /auth/verify-email/:token → anyone can hit this
router.get("/verify-email/:token", verifyEmail);

// POST /auth/resend-verification → anyone can hit this
router.post("/resend-verification", resendVerification);

// GET /auth/me  → protected! must send a valid token
router.get("/me", protect, getMe);
 
module.exports = router;
 