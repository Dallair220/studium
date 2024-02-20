require('dotenv').config();
const express = require('express');
const path = require('path');
const cookieParser = require('cookie-parser');
const logger = require('morgan');
const mongoose = require('mongoose');
const session = require('express-session');
const passport = require('passport');
require('./config/passport');

const playerRouter = require('./routes/player');
const authRouter = require('./routes/auth');

const app = express();

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
  res.status(500).json({ status: 'server error', message: err.message });
});

module.exports = app;
