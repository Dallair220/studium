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
  body('gameName', 'Error in Summoner name').trim().isLength({ min: 3, max: 23 }).escape(),
  body('tagLine', 'Error in Tagline').trim().isLength({ min: 3, max: 5 }).escape(),
  // Process request
  asyncHandler(async (req, res, next) => {
    const playerCount = await Player.countDocuments({});
    if (playerCount >= 15) {
      res.json({ status: 'error', message: 'Maximum number of players reached.' });
      return;
    }
    // Extract the validation errors from a request.
    const errors = validationResult(req);
    // If there are errors, send them to the client.
    if (!errors.isEmpty()) {
      res.json({ status: 'error', message: errors.array()[0].msg });
      return;
    }
    // Get the summoner's rank information.
    const summonerData = await bundleInfoBySummonerName(req.body.gameName);
    // Check if the player already exists in the database.
    const playerExists = await Player.findOne({ gameName: summonerData.gameName });
    if (playerExists) {
      res.json({ status: 'error', message: summonerData.gameName + ' already exists.' });
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
    res.json({ status: 'success', message: newPlayer.gameName + ' added.' });
  }),
];

// Handle Player delete on POST.
exports.player_delete_post = asyncHandler(async (req, res, next) => {
  const existingPlayer = await Player.findById(req.params.id);
  if (existingPlayer === null) {
    res.json({ status: 'error', message: 'Player not found. ID: ' + req.params.id });
    return;
  }
  const existingRank = await Rank.findById(existingPlayer.rank);
  if (existingRank === null) {
    res.json({ status: 'error', message: 'Rank not found. ID: ' + existingPlayer.rank });
    return;
  }
  await Player.findByIdAndDelete(req.params.id);
  await Rank.findByIdAndDelete(existingPlayer.rank);
  res.json({ status: 'success', message: existingPlayer.gameName + ' deleted.' });
});

// Handle Player update on POST.
exports.player_update_post = asyncHandler(async (req, res, next) => {
  const playerToUpdate = await Player.findById(req.params.id);
  if (playerToUpdate === null) {
    res.json({ status: 'error', message: 'Player not found. ID: ' + req.params.id });
    return;
  }
  // Get the summoner's rank information.
  const summonerData = await bundleInfoBySummonerName(playerToUpdate.gameName);
  // Update Rank object
  const updatedRank = new Rank({
    rank: summonerData.soloRank.tier,
    division: summonerData.soloRank.rank,
    leaguePoints: summonerData.soloRank.leaguePoints,
    wins: summonerData.soloRank.wins,
    losses: summonerData.soloRank.losses,
    _id: playerToUpdate.rank, // This is required, or a new ID will be assigned
  });
  await Rank.findByIdAndUpdate(playerToUpdate.rank, updatedRank, {});
  // Update Player object
  const updatedPlayer = new Player({
    gameName: summonerData.gameName,
    tagLine: req.body.tagLine,
    profileIconId: summonerData.profileIconId,
    _id: req.params.id,
  });
  // Save the updated Player to the database and send it to the client.
  await Player.findByIdAndUpdate(req.params.id, updatedPlayer, {});
  res.json({ status: 'success', message: updatedPlayer.gameName + ' updated.' });
});
