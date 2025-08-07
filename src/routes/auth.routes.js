
const express = require('express');
const router = express.Router();
const { validateRegister } = require('../middleware/validators.middleware');
const { register, login, getUserProfile } = require('../controllers/auth.controller'); // Ensure getUser Profile is defined

// Public routes (no auth middleware)
router.post('/register', validateRegister, register); 
router.post('/login', login);

// Protected routes
router.get('/profile', authenticate, getUserProfile); 

module.exports = router;
