require('dotenv').config();
const express = require('express');
const path = require('path');
const cookieParser = require('cookie-parser');
const logger = require('morgan');
const compression = require('compression');
const helmet = require('helmet');
const mongoose = require('mongoose');
const session = require('express-session');
const passport = require('passport');
require('./config/passport');

const playerRouter = require('./routes/player');
const authRouter = require('./routes/auth');

const app = express();

// Set up rate limiter: maximum of 200 requests per minute
const RateLimit = require('express-rate-limit');
const limiter = RateLimit({
  windowMs: 1 * 60 * 1000, // 1 minute
  max: 200,
  handler: (req, res) => {
    res.status(429).json({ message: 'Too many requests, please try again later.' });
  },
});
// Apply rate limiter to all requests
app.use(limiter);

// Set up security headers
app.use(
  helmet.contentSecurityPolicy({
    directives: {
      defaultSrc: ["'self'"],
      connectSrc: ["'self'", 'https://accounts.google.com'],
      imgSrc: ["'self'", 'https://static.bigbrain.gg', 'https://cdn-icons-png.flaticon.com'],
    },
  })
);
app.disable('x-powered-by');

// Compress all routes
app.use(compression());

// MongoDB connection
mongoose.connect(process.env.MONGODB_CONNECTION_URI);
mongoose.connection.on('error', console.error.bind(console, 'MongoDB connection error:'));

// Middleware
app.use(logger('dev'));

app.use(session({ secret: process.env.SESSION_SECRET, resave: false, saveUninitialized: true }));
app.use(passport.initialize());
app.use(passport.session());

app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'client/dist')));
app.use(express.static(path.join(__dirname, 'public')));

app.use('/players', playerRouter);
app.use('/auth', authRouter);

// Error handling middleware
app.use((err, req, res, next) => {
  console.error('error', err.message);
  res.status(500).json({ status: 'server error', message: err.message });
});

module.exports = app;
