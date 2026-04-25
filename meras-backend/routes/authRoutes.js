const express = require("express");  // importing express
const router = express.Router();  // using the router from express

const { register, login, getMe } = require("../controllers/authController");
const { protect } = require("../middleware/authMiddleware");  // to check if the users token is still valid

// POST /auth/register  → anyone can hit this (no token needed)
router.post("/register", register);

// POST /auth/login     → anyone can hit this (no token needed)
router.post("/login", login);

 
// GET/auth/me  → protected! must send a valid token
//  protect middleware runs first, then getMe
router.get("/me", protect, getMe);
 
module.exports = router;
 