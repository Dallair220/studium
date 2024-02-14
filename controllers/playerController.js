const Player = require('../models/player');
const asyncHandler = require('express-async-handler');

// Display home page (list of all Players).
exports.player_list_get = asyncHandler(async (req, res, next) => {
  const allPlayers = await Player.find({}).populate('rank');
  res.json(allPlayers);
});

// Handle Player create on POST.
exports.player_create_post = asyncHandler(async (req, res, next) => {
  res.send('NOT IMPLEMENTED: Player create POST');
});

// Handle Player delete on POST.
exports.player_delete_post = asyncHandler(async (req, res, next) => {
  res.send('NOT IMPLEMENTED: Player delete POST');
});

// Handle Player update on POST.
exports.player_update_post = asyncHandler(async (req, res, next) => {
  res.send('NOT IMPLEMENTED: Player update POST');
});
