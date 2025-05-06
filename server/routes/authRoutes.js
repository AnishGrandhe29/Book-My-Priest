// routes/authRoutes.js
const express = require('express');
const authController = require('../controllers/authController');
const router = express.Router();

// Register user
router.post('/register', authController.register);

// Login user
router.post('/login', authController.login);

module.exports = router;

// Placeholder route for testing
router.get('/test', (req, res) => {
  res.json({ message: 'Auth route is working' });
});

// These will be implemented later with actual controller functions
router.post('/register', (req, res) => {
  res.json({ message: 'Register endpoint (to be implemented)' });
});

router.post('/login', (req, res) => {
  res.json({ message: 'Login endpoint (to be implemented)' });
});

module.exports = router;