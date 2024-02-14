const asyncHandler = require('express-async-handler');
const { body, validationResult } = require('express-validator');
const sortLadder = require('../utils/rankSortingUtils');
const Player = require('../models/player');
const Rank = require('../models/rank');

// Return list of all Players.
exports.player_list_get = asyncHandler(async (req, res, next) => {
  const allPlayers = await Player.find({}).populate('rank');
  const sortedPlayers = sortLadder(allPlayers);
  res.json({ status: 'success', sortedPlayers });
});

// Handle Player create on POST.
exports.player_create_post = [
  // Validate and sanitize fields.
  body('gameName', 'Summoner name is required.').trim().isLength({ min: 3, max: 23 }).escape(),
  body('tagLine', 'Tagline is required.').trim().isLength({ min: 3, max: 5 }).escape(),
  // Process request
  asyncHandler(async (req, res, next) => {
    // Extract the validation errors from a request.
    const errors = validationResult(req);
    // If there are errors, send them to the client.
    if (!errors.isEmpty()) {
      res.json({ status: 'error', errors: errors.array() });
      return;
    }
    // Create a Player object with escaped and trimmed data.
    const newPlayer = new Player({
      gameName: req.body.gameName,
      tagLine: req.body.tagLine,
    });
    // Save the new Player to the database and send it to the client.
    await newPlayer.save();
    res.json({ status: 'success', newPlayer });
  }),
];

// Handle Player delete on POST.
exports.player_delete_post = asyncHandler(async (req, res, next) => {
  const existingPlayer = await Player.findById(req.params.id); // or req.body.playerId
  if (existingPlayer === null) {
    res.json({ status: 'error', message: 'Player not found.' });
    return;
  }
  await existingPlayer.remove();
  res.json({ status: 'success', message: 'Player deleted successfully.' });
});

// Handle Player update on POST.
exports.player_update_post = [
  // Validate and sanitize fields.
  body('gameName', 'Summoner name is required.').trim().isLength({ min: 3, max: 23 }).escape(),
  body('tagLine', 'Tagline is required.').trim().isLength({ min: 3, max: 5 }).escape(),
  // Process request
  asyncHandler(async (req, res, next) => {
    // Extract the validation errors from a request.
    const errors = validationResult(req);
    // If there are errors, send them to the client.
    if (!errors.isEmpty()) {
      res.json({ status: 'error', errors: errors.array() });
      return;
    }
    // Create a Player object with escaped and trimmed data.
    const updatedPlayer = new Player({
      gameName: req.body.gameName,
      tagLine: req.body.tagLine,
      _id: req.params.id,
    });
    // Save the updated Player to the database and send it to the client.
    await Player.findByIdAndUpdate(req.params.id, updatedPlayer, {});
    res.json({ status: 'success', updatedPlayer });
  }),
];
