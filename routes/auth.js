const express = require('express');
const router = express.Router();
const passport = require('passport');
const User = require('../models/user');

router.post('/register', async (req, res, next) => {
  try {
    const user = new User({
      email: req.body.email,
      password: req.body.password,
    });
    const result = await user.save();
    res.json({ status: 'success', message: 'User registered successfully' });
  } catch (err) {
    if (err.code === 11000) {
      res.status(409).json({ status: 'error', message: 'User already exists' });
      return;
    }
    return next(err);
  }
});

router.post('/login', (req, res, next) => {
  passport.authenticate('local', (err, user, info) => {
    if (err) {
      return res.status(500).json({ message: 'An error occurred during authentication.' });
    }
    if (!user) {
      return res.status(401).json(info);
    }
    req.logIn(user, (err) => {
      if (err) {
        return res.status(500).json({ message: 'An error occurred during login.' });
      }
      return res.status(200).json({ message: 'Login successful.' });
    });
  })(req, res, next);
});

router.post('/logout', (req, res, next) => {
  req.logout((err) => {
    if (err) {
      return next(err);
    }
    res.json({ status: 'success', message: 'User logged out successfully' });
  });
});

router.get('/check', function (req, res) {
  if (req.isAuthenticated()) {
    res.status(200).json({ isAuthenticated: true });
  } else {
    res.status(200).json({ isAuthenticated: false });
  }
});

module.exports = router;
