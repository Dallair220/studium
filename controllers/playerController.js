const asyncHandler = require('express-async-handler');
const { body, validationResult } = require('express-validator');
const sortLadder = require('../utils/rankSortingUtils');
const bundleInfoBySummonerName = require('../utils/summonerDataUtils');
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
      res.json({ status: 'error', message: errors.array() });
      return;
    }
    // Get the summoner's rank information.
    const summonerData = await bundleInfoBySummonerName(req.body.gameName);
    // Check if the player already exists in the database.
    const playerExists = await Player.findOne({ gameName: summonerData.gameName });
    if (playerExists) {
      res.json({ status: 'error', message: 'Player already exists.' });
      return;
    }
    // Create a Rank object
    const rank = new Rank({
      rank: summonerData.soloRank.tier,
      division: summonerData.soloRank.rank,
      leaguePoints: summonerData.soloRank.leaguePoints,
      wins: summonerData.soloRank.wins,
      losses: summonerData.soloRank.losses,
    });
    await rank.save();
    // Create a Player object
    const newPlayer = new Player({
      gameName: summonerData.gameName,
      tagLine: req.body.tagLine,
      profileIconId: summonerData.profileIconId,
      rank: rank,
    });
    await newPlayer.save();
    // Send successfull response to the client.
    res.json({ status: 'success', message: 'Player created successfully.' });
  }),
];

// Handle Player delete on POST.
exports.player_delete_post = asyncHandler(async (req, res, next) => {
  const existingPlayer = await Player.findById(req.params.id);
  if (existingPlayer === null) {
    res.json({ status: 'error', message: 'Player not found.' });
    return;
  }
  const existingRank = await Rank.findById(existingPlayer.rank);
  if (existingRank === null) {
    res.json({ status: 'error', message: 'Rank not found.' });
    return;
  }
  await Player.findByIdAndDelete(req.params.id);
  await Rank.findByIdAndDelete(existingPlayer.rank);
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
      res.json({ status: 'error', message: errors.array() });
      return;
    }
    // Get the summoner's rank information.
    const summonerData = await bundleInfoBySummonerName(req.body.gameName);
    // Check if the player already exists in the database.
    const playerExists = await Player.findOne({ gameName: summonerData.gameName });
    if (playerExists) {
      res.json({ status: 'error', message: 'Player already exists.' });
      return;
    }
    // Create a Rank object
    const updatedRank = new Rank({
      rank: summonerData.soloRank.tier,
      division: summonerData.soloRank.rank,
      leaguePoints: summonerData.soloRank.leaguePoints,
      wins: summonerData.soloRank.wins,
      losses: summonerData.soloRank.losses,
      _id: playerExists.rank, // ?
    });
    await Rank.findByIdAndUpdate(playerExists.rank, updatedRank, {});
    // Create a Player object with escaped and trimmed data.
    const updatedPlayer = new Player({
      gameName: summonerData.gameName,
      tagLine: req.body.tagLine,
      profileIconId: summonerData.profileIconId,
      _id: req.params.id,
    });
    // Save the updated Player to the database and send it to the client.
    await Player.findByIdAndUpdate(req.params.id, updatedPlayer, {});
    res.json({ status: 'success', message: 'Player updated successfully.' });
  }),
];
