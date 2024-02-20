const bcrypt = require('bcryptjs');
const passport = require('passport');
const { body, validationResult } = require('express-validator');
const User = require('../models/user');

// POST request to register user.
exports.user_register = [
  // Validate and sanitize fields.
  body('email', 'Error in Email').trim().isLength({ min: 5 }).escape(),
  body('password', 'Error in Password').trim().isLength({ min: 5 }).escape(),
  async (req, res, next) => {
    // Extract the validation errors from a request.
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      // 422 Unprocessable Entity
      return res.status(422).json({ status: 'error', message: errors.array()[0].msg });
    }
    // Hash the password
    bcrypt.hash(req.body.password, 10, async (err, hashedPassword) => {
      if (err) {
        return next(err);
      }
      try {
        const user = new User({
          email: req.body.email,
          password: hashedPassword,
        });
        await user.save();
        res.json({ status: 'success', message: 'User registered successfully' });
      } catch (err) {
        if (err.code === 11000) {
          // mongoose error code 11000 is for duplicate key error
          return res.status(409).json({ status: 'error', message: 'User already exists' });
        }
        return next(err);
      }
    });
  },
];

// POST request to log user in.
exports.user_login = [
  // Validate and sanitize fields.
  body('email', 'Error in Email').trim().isLength({ min: 5 }).escape(),
  body('password', 'Error in Password').trim().isLength({ min: 5 }).escape(),
  (req, res, next) => {
    // Extract the validation errors from a request.
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      // 422 Unprocessable Entity
      return res.status(422).json({ status: 'error', message: errors.array()[0].msg });
    }
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
  },
];

// POST request to log user out.
exports.user_logout = (req, res, next) => {
  req.logout((err) => {
    if (err) {
      return next(err);
    }
    res.json({ status: 'success', message: 'User logged out successfully' });
  });
};

// GET request to check if user is authenticated.
exports.user_check = (req, res) => {
  if (req.isAuthenticated()) {
    res.status(200).json({ isAuthenticated: true });
  } else {
    res.status(200).json({ isAuthenticated: false });
  }
};
